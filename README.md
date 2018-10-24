# fofx-mongodb

An input/output plugin for MongoDB for [fofx](https://github.com/functzia/fofx)

- **type:** `"mongodb"`
- **params (these go in your _plugins.json_):** _none._
- **input params (these go in your _nano.json_ input key)**:
  - **connectionString [string]** connection string to your mongo cluster (must be cabaple of producing a Change Stream).
  - **db [string]** which database to connect to.
  - **collection [string]** trigger the nano on every insert to this collection, with the inserted document as a parameter.
- **output params (these go in your _nano.json_ output key):**
  - **connectionString [string]** connection string to your mongo cluster.
  - **db [string]** which database to connect to.
  - **collection [string]** insert the return value as a document to this collection, or documents, if the return value is an array.

## Sample _plugins.json_

```json
["fofx-mongodb"]
```

## Sample _nano.json_

```json
{
  "input": {
    "type": "mongodb",
    "connectionString": "mongodb+srv://<user>:<password>@host:port/<cluster>",
    "db": "fofxTest",
    "collection": "test"
  },
  "output": {
    "type": "mongodb",
    "connectionString": "mongodb://<user>:<password>@host:port/<cluster>",
    "db": "fofxTest",
    "collection": "test"
  }
}
```
