const express = require('express');
const router = express.Router();
const mortgage = require('../models/mortgage');

router.get('/', (req, res) => {
    mortgage.find({})
    .sort({dateOfLead: 1})
    .then(resp => {
        res.send(resp)
    })
})

module.exports = router;