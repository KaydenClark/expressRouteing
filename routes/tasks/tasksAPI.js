const express = require('express');
const router = express.Router();

const {readTasks} = require('../../dataAccessLayer/tasks/readTasks')
const {readTaskById} = require('../../dataAccessLayer/tasks/readTaskById')
const {newTask} = require('../../dataAccessLayer/tasks/newTask')
const {updateTaskbyId} = require('../../dataAccessLayer/tasks/updateTaskbyId')
const {updateTaskComplete} = require('../../dataAccessLayer/tasks/updateTaskComplete')
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

router.patch('/:id/titleChange', async (req, res) => {
    const new_task = req.body
    console.log(new_task.title)
    const id = req.params.id
    const updatedTask = await updateTaskbyId(id, new_task.title)
    res.send(updatedTask)
})

router.patch('/:id', async (req, res) => {
    const completeness = req.body
    const id = req.params.id
    const updatedTask = await updateTaskComplete(id, completeness)
    res.send(updatedTask)
})

router.delete('/:taskId', async (req, res) => {
    await testConnection()
    const taskId = req.params.taskId
    const removeTask = await deleteTask(taskId)
    res.send(removeTask)
})

module.exports = router