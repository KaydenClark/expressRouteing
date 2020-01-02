const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()
const {deleteTask} = require('../tasks/deleteTask')

// Connection URL
const url = process.env.ATLAS_CONNECTION

const dbName = 'ToDoProject';
const settings = {
    useUnifiedTopology: true
}

const deleteList = (listId) => {
    let iou = new Promise ((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
               reject(err) 
            } else {
                console.log("Connected to server to Delete a List");
                const db = client.db(dbName);
                // Get the contacts collection
                const collection = db.collection('ToDoLists');
                // Insert a document
                collection.find({ _id: ObjectId(listId) }).toArray(function (err, docs) {
                    if (err) {
                        reject(err)
                    } else {
                        const removeListTasks = async () => {
                            for(i = 0; i < docs.length; i++){
                                for(j = 0; j < docs[i].todos.length; j++){
                                    console.log('Task being delted')
                                    await deleteTask(docs[i].todos[j])
                                }
                            }
                        } //removeListTasks
                        removeListTasks()}
                        collection.deleteOne({ '_id': ObjectId(listId) },
                        function (err, result) {
                            if(err){
                                reject(err)
                            } else {
                                // console.log(result)
                                client.close();
                                resolve("deleted list and its tasks")
                            }
                            
                        });
                    });
            }          
       }); 
    })
    return iou
};

module.exports = {deleteTask}