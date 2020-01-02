const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()


// Connection URL
const url = process.env.ATLAS_CONNECTION

const dbName = 'ToDoProject';
const settings = {
    useUnifiedTopology: true
}

const deleteTask = (taskId) => {
    let iou = new Promise ((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
               reject(err) 
            } else {
                console.log("Connected to server to Delete a Task");
                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoTasks');
                // Insert a document
                collection.deleteOne({ '_id': ObjectId(taskId) },
                    function (err, docs) {
                        if(err){
                            reject(err)
                        } else {
                            client.close();
                            resolve("Delete documents in the collection")
                        }
                        
                    });
            }          
       }); 
    })
    return iou
};

module.exports = {deleteTask}