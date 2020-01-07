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



const readFilteredLists = () => {
    let iou = new Promise((resolve, reject) => {
    // Use connect method to connect to the server
        MongoClient.connect(url, settings, function (err, client) {
            if(err){
            reject(err)
            }else{
                console.log("Connected to server read tasks");

                const db = client.db(dbName);
                // Get the contacts collection
                const collectionLists = db.collection('ToDoLists');
                const collectionTasks = db.collection('ToDoTasks');
                // Find some documents
                collectionLists.find({}).toArray(async function (err, docs) {
                    if(err){
                        reject(err)
                    }else{
                        const getTask = (id) => {
                            let iou = new Promise((resolve, reject) => {
                                collectionTasks.find({ _id: ObjectId(id) }).toArray(function (err, docs) {
                                    if (err){
                                        reject(err)
                                    }else{
                                        const results = {
                                            data: docs[0],
                                            msg: "found the following records"
                                        }
                                        resolve(results)
                                    }
                                })
                            })
                            return iou;
                        } //getTask
                        const filterList = async () => {
                            let listList = []
                            for(i = 0; i < docs.length; i++){
                                let todoTasks = []
                                let taskIds = []
                                for(j = 0; j < docs[i].todos.length; j++){
                                    const task = await getTask(docs[i].todos[j])
                                    console.log('pushing task')
                                    taskIds.push(task.data._id)
                                    todoTasks.push({
                                        title: task.data.title, 
                                        id: task.data._id})
                                }
                                listList.push(
                                    {
                                    id : docs[i]._id,
                                    title : docs[i].title,
                                    // taskIds: taskIds,
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

module.exports = {readFilteredLists}