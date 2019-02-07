const express = require('express');
const router = express.Router();
const mortgage = require('../models/mortgage');

router.get('/', (req, res) => {
    mortgage.find({})
    .sort({id: 0})
    .then(resp => {
        res.send(resp)
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    mortgage.find({ id })
    .then(resp => {
        res.send(resp)
    })
})

module.exports = router;