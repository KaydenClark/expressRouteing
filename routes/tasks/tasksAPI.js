const express = require('express');
const router = express.Router();

const {readTasks} = require('../../dataAccessLayer/tasks/readTasks')
const {readTaskById} = require('../../dataAccessLayer/tasks/readTaskById')
const {newTask} = require('../../dataAccessLayer/tasks/newTask')
const {updateTask} = require('../../dataAccessLayer/tasks/updateTask')
const {deleteTask} = require('../../dataAccessLayer/tasks/deleteTask')
const {testConnection} = require('../../dataAccessLayer/testConnection')

router.get('/', async (req, res) => {
    tasks = await readTasks()
    res.send(tasks)
});

router.get('/:taskId', async (req, res) => {
    const taskId = req.params.taskId
    const task = await readTaskById(taskId)
    res.send(task)
});

router.post('/:listId', async (req, res) => {
    const new_task = req.body
    const listId = req.params.listId
    const task = await newTask(new_task, listId)
    res.send(task)
})

router.put('/:id', async (req, res) => {
    const new_task = req.body
    const id = req.params.id
    const updatedTask = await updateTask(id, new_task.complete)
    res.send(updatedTask)
})

app.delete('/:taskId', async (req, res) => {
    await testConnection()
    const taskId = req.params.taskId
    const removeTask = await deleteTask(taskId)
    res.send(removeTask)
})

module.exports = router