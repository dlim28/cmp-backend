const express = require('express');
const router = express.Router();
const mortgage = require('../models/mortgage');

router.get('/', (req, res) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    let from = new Date(`${currentYear - 1}-07-01`)
    let until = new Date(`${currentYear}-06-30`)

    mortgage.find(
        {
            $and:
            [
                {status:"settlement"},
                {dateOfLead: {$gte: from, $lte: until}}
            ]
        }
    )
    .sort(
        {id:1}
    )
    .then((resp) => {
        res.send(resp)
    })
})

router.get('/:id', (req,res) => {
    const { id } = req.params;
    mortgage.findOne({ id })
    .then((resp) => {
        res.send(resp);
    })
})

module.exports = router;