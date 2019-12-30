const express = require('express');
const router = express.Router();

const {readLists} = require('../dataAccessLayer/lists/readLists')

router.get('/', async (req, res) => {
    lists = await readLists()
    res.send(lists)
})

module.exports = router