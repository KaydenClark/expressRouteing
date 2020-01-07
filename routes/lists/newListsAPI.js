const express = require('express');
const router = express.Router();

const {newList} = require('../../dataAccessLayer/lists/newList')

router.post('/', async (req, res) => {
    const new_list = req.body
    // console.log(req.body)
    const list = await newList(new_list)
    res.send(list)
})

module.exports = router