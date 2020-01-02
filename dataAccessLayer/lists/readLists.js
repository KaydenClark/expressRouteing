const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()
const {readTaskById} = require('../tasks/readTaskById')

// Connection URL
const url = process.env.ATLAS_CONNECTION

const dbName = 'ToDoProject';
const settings = {
    useUnifiedTopology: true
}

const readLists = () => {
    let iou = new Promise((resolve, reject) => {
        // Use connect method to connect to the server
            MongoClient.connect(url, settings, function (err, client) {
                if(err){
                reject(err)
                }else{
                    console.log("Connected to server read tasks");
    
                    const db = client.db(dbName);
                    // Get the contacts collection
                    const collection = db.collection('ToDoLists');
                    // Find some documents
                    collection.find({}).toArray(function (err, docs) {
                        if(err){
                            reject(err)
                        }else{
                            const results = {
                                data: docs,
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

module.exports = {readLists}