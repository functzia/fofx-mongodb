const mongodb = require('mongodb');

module.exports = (_params, log) => ({
  type: 'mongodb',
  async input({ connectionString, db, collection }, execute) {
    try {
      const client = await mongodb.MongoClient.connect(
        connectionString,
        { useNewUrlParser: true }
      );
      const dbCollection = client.db(db).collection(collection);
      dbCollection
        .watch([{ $match: { operationType: 'insert' } }])
        .on('change', ({ fullDocument }) =>
          execute(JSON.parse(JSON.stringify(fullDocument)))
        );
    } catch (err) {
      log.fatal('Connection to db failed', err);
    }
  },
  output({ connectionString, db, collection }) {
    let dbCollection;
    mongodb.MongoClient.connect(
      connectionString,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          return log.fatal('Connection to db failed', err);
        }
        dbCollection = client.db(db).collection(collection);
      }
    );
    return data => {
      if (!dbCollection) {
        return log.warn('Write was attempted before successful connection');
      }
      return Array.isArray(data)
        ? dbCollection.insertMany(data)
        : dbCollection.insertOne(data);
    };
  },
});
