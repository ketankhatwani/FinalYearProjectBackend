const express = require('express');
const router = express.Router();
const Slote = require('../Models/sloteModel');
const asyncHandler = require('express-async-handler');
const protect = require('../MiddeleWare/authMiddeleware');

router.post('/newSlote', protect, asyncHandler( async (req,res) => {
    const {date, startTime, endTime} = req.body;

    if( !date || !startTime || !endTime) {
        res.status(400);
        throw new Error('Please add all details.');
    }

    const doctorId = req.id;

    const slote = await Slote.create({
        date,
        startTime,
        endTime,
        doctorId
    });

    if(slote) {
        res.status(201);
        res.json({
            id: slote.id,
            date : slote.date,
            startTime: slote.startTime,
            endTime: slote.endTime,
            doctorId: slote.doctorId
        })
    } else {
        res.status(400);
        throw new Error('Invalid Data. Slote can not be Created.');
    }
})
)


router.post('/bookSlote', protect, asyncHandler( async (req,res) => {
    const {date, startTime, endTime, doctorId} = req.body;

    if( !date || !startTime || !endTime) {
        res.status(400);
        throw new Error('Please add all details.');
    }

    const result = await Slote.find({
        date: date,
        startTime: startTime,
        endTime: endTime,
        doctorId: doctorId
    });

    var slote = JSON.stringify(result);
    slote = JSON.parse(slote);
    console.log(slote);

    if(slote.userId) {
        res.status(400);
        throw new Error('Slote is Already Booked.')
    } else {
        // const userId = req.id;
        // const result = await Slote.findByIdAndUpdate({_id : slote.id} , {
        //     $set : {
        //         userId: userId
        //     }
        // } , {
        //     useFindAndModify : false,
        // });
        res.status(201);
        res.json({
            message: 'Slote Booked Successfully.'
        })
    }
})
)

module.exports = router;