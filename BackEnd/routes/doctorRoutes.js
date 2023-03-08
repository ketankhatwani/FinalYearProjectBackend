const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Doctor = require('../Models/doctorModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const protect = require('../MiddeleWare/authMiddeleware');
const parser = require('../MiddeleWare/fileUpload')


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

//Login
router.post('/login', asyncHandler( async (req,res) => {
    const {email, password} = req.body;

    if( !email || !password){
        res.status(400);
        throw new Error('Please add all details.');
    }

    const doctor = await Doctor.findOne({email});
    if(doctor && await bcrypt.compare(password, doctor.password))
    {
        res.json({
            name: doctor.name,
            email: doctor.email,
            phoneno: doctor.phoneno,
            token: generateToken(doctor.id)
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
router.post('/register', parser.single('file'), asyncHandler( async (req,res) => {
    const {name, email, phoneno, gender, dob, education, experience, awards, clinic, password} = req.body;

    if(!name || !email || !phoneno || !gender || !dob || !password){
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
        gender,
        dob,
        file: req.file.path,
        cloud_id: req.file.filename, 
        education,
        experience,
        awards,
        clinic,
        password: hashedpwd
    });

    if(doctor) {
        res.status(201);
        res.json({
            id: doctor.id,
            name : doctor.name,
            token: generateToken(doctor.id),
            file: doctor.file
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid data');
    }
})
)

router.get('/getDoctor/:id',protect , asyncHandler( async (req,res) => {
    const doctor = await Doctor.findById(req.params.id).select('-password');

    if(doctor) {
        res.status(200);
        res.json(doctor);
    }
    else {
        res.status(400);
        throw new Error('Data not available.');
    }
})
)

router.get('/getAllDoctors', asyncHandler( async (req,res) => {
    const doctor = await Doctor.find({}).select('-password');

    res.status(200);
    res.json(doctor);
})
)

router.put('/updateDoctor/:id', protect, asyncHandler( async (req,res) => {
    const {name, email, phoneno, gender, dob, education, experience, awards, clinic} = req.body;

    const result = await Doctor.findByIdAndUpdate({_id : req.params.id} , {
        $set : {
            name: name,
            email: email,
            phoneno: phoneno,
            gender: gender,
            dob: dob,
            education: education,
            experience: experience,
            awards: awards,
            clinic: clinic,
        }
    } , {
        useFindAndModify : false,
    });
    
    res.status(200);
    res.json(result);
})
)

router.delete('/deleteDoctor/:id', protect, asyncHandler( async (req,res) => {
    
    await Doctor.findOneAndRemove({_id: req.params.id})
    res.status(200);
    res.json({
        message: 'sucess'
    });
})
)

module.exports = router;