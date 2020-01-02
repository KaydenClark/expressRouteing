const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()


// Connection URL
const url = process.env.ATLAS_CONNECTION

const dbName = 'ToDoProject';
const settings = {
    useUnifiedTopology: true
}

const readListById = (id) => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            } else {
                // console.log("Connected to server Read Contacts");

                const db = client.db(dbName);
                // Get the tasks collection
                const collection = db.collection('ToDoLists');
                // Find some documents
                collection.find({ _id: ObjectId(id) }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        // console.log(docs[0])
                        const results = {
                            data: docs[0],
                            msg: "Found the following records"
                        }

                        client.close();
                        resolve(results);
                    }
                });
            }
        });
    })
    return iou;
}

module.exports = {readListById}