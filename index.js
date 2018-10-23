const mongodb = require('mongodb');

module.exports = (_params, log) => ({
  type: 'mongodb',
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
