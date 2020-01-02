const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()


// Connection URL
const url = process.env.ATLAS_CONNECTION

const dbName = 'ToDoProject';
const settings = {
    useUnifiedTopology: true
}

const updateTask = (id, task) => {
    let iou = new Promise((resolve, reject) => {
        
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if (err) {
                reject(err)
            }
            else{
                console.log("Connected to server to Update a Task");

                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoTasks');
                // Insert a document
                collection.updateOne({ "_id": ObjectId(id) }, 
                    { $set: { "complete": task } },
                    function (err, result) {
                        if(err){
                            reject(err)
                        }  else{
                            client.close();
                            resolve("Updated a document in the collection");
                        }
                });
            }
        });
    })
    return iou
}

module.exports = {updateTask}