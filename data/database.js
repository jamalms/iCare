const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connecteToDatabase() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('iCARE');
}

function getDb() {
    if (!database) {
        throw new Error('You must connect first');
    }

    return database;
}

module.exports = {
    connecteToDatabase: connecteToDatabase,
    getDb: getDb
};