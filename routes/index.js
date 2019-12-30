const express = require('express');
const router = express.Router();

router.use('/list', require('./lists/listGet'))

router.get('/test', (req, res) =>{
    res.send('Hello World')
})

module.exports = router