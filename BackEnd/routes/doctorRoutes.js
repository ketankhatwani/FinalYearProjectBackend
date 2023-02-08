const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Doctor = require('../Models/doctorModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const protect = require('../MiddeleWare/authMiddeleware');


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

//Login
router.post('/doctorLogin', asyncHandler( async (req,res) => {
    const {email, password} = req.body;

    if( !email || !password){
        res.status(400);
        throw new Error('Please add all details.');
    }

    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password, user.password))
    {
        res.json({
            name: user.name,
            email: user.email,
            phoneno: user.phoneno,
            token: generateToken(user.id)
        });
    }
    else
    {
        res.status(400);
        throw new Error('Invalid Credentials!');
    }
})
)

//Register Doctor
router.post('/registerDoctor', asyncHandler( async (req,res) => {
    const {name, email, phoneno, password} = req.body;

    if(!name || !email || !phoneno || !password){
        res.status(400);
        throw new Error('Please add all details.');
    }

    const doctorExist = await Doctor.findOne({email});
    if(doctorExist)
    {
        res.status(400);
        throw new Error('Doctor already Exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpwd = await bcrypt.hash(password,salt);

    const doctor = await Doctor.create({
        name,
        email,
        phoneno,
        password: hashedpwd
    });

    if(doctor) {
        res.status(201);
        res.json({
            id: user.id,
            name : user.name,
            token: generateToken(user.id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid User data');
    }
})
)
