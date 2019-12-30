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
                collection.find({}).toArray(async function (err, docs) {
                    if(err){
                        reject(err)
                    }else{
                        const filterList = async () => {
                            let listList = []
                            for(i = 0; i < docs.length; i++){
                                let todoTasks = []
                                for(j = 0; j < docs[i].todos.length; j++){
                                    const task = await readTaskById(docs[i].todos[j])
                                    todoTasks.push(task.data.title)
                                }
                                listList.push(
                                    {title : docs[i].title,
                                    data : todoTasks})
                            }
                            return listList
                        }
                        
                        const results = {
                            data: await filterList(),
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