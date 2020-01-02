const express = require('express');
const router = express.Router();

const {readFilteredLists} = require('../../dataAccessLayer/lists/readFilteredLists')
const {testConnection} = require('../../dataAccessLayer/testConnection') 
const {readLists} = require('../../dataAccessLayer/lists/readLists')
const {readListById} = require('../../dataAccessLayer/lists/readListById')
const {newList} = require('../../dataAccessLayer/lists/newList')
const {updateList} = require('../../dataAccessLayer/lists/updateList')
const {deleteList} = require('../../dataAccessLayer/lists/deleteList')

router.get('/', async (req, res) => {
    lists = await readFilteredLists()
    res.send(lists)
})

router.get('/data', async (req, res) => {
    lists = await readLists()
    res.send(lists)
});

router.get('/:listId', async (req, res) => {
    const listId = req.params.listId
    const list = await readListById(listId)
    res.send(list)
})

router.post('/', async (req, res) => {
    const new_list = req.body
    const list = await newList(new_list)
    res.send(list)
})

router.patch('/:id', async (req, res) => {
    const new_list = req.body
    const id = req.params.id
    const updatedTask = await updateList(id, new_list.todos)
    res.send(updatedTask)
})

router.delete('/:listId', async (req, res) => {
    await testConnection()
    const listId = req.params.listId
    const removeList = await deleteList(listId)
    res.send(removeList)
})

module.exports = router