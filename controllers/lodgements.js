const express = require('express');
const router = express.Router();
const mortgage = require('../models/mortgage');

router.get('/', (req,res) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear();

    mortgage.find(
        {
            $and: 
            [
                {"status":"lodgement"},
                {"dateOfLead": {"$gte": `01/07/${currentYear - 1}`, "$lte": `30/06/${currentYear}`}}
            ]
        }
    ).sort(
        {"id": 1}
    )
    .lean()
    .then((resp) => {
        
        for (let index = 0; index < resp.length; index++) {
            const dateStr = resp[index].dateOfLead;
            const dateStrMod = dateStr.split("/")
            const dateOfLeadObj = new Date(`${dateStrMod[2]}-${dateStrMod[1]}-${dateStrMod[0]}`);
            const currentDate = new Date();

            const timeDiff = Math.abs(currentDate.getTime() - dateOfLeadObj.getTime())
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
            resp[index].WIP = diffDays
        }

        res.send(resp)
    })
    .catch(err => {
        res.send(err)
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