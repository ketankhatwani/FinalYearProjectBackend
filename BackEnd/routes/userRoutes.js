const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const protect = require('../MiddeleWare/authMiddeleware');


//Generate JWT Token
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

    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password, user.password))
    {
        res.json({
            name: user.name,
            email: user.email,
            phoneno: user.phoneno,
            dob: user.dob,
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

//Register User
router.post('/registerUser', asyncHandler( async (req,res) => {
    const {name, email, dob, phoneno, password} = req.body;

    if(!name || !email || !dob || !phoneno || !password){
        res.status(400);
        throw new Error('Please add all details.');
    }

    const userExist = await User.findOne({email});
    if(userExist)
    {
        res.status(400);
        throw new Error('User all ready Exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpwd = await bcrypt.hash(password,salt);

    const user = await User.create({
        name,
        email,
        dob,
        phoneno,
        password: hashedpwd
    });

    if(user) {
        res.status(201);
        res.json({
            id: user.id,
            name : user.name,
            dob: user.dob,
            token: generateToken(user.id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid User data');
    }
})
)


//Get User
router.get('/getUser/:id', protect, asyncHandler( async (req,res) => {
    const{id, name, email, dob, phoneno} = await User.findById(req.params.id).select('-password');

    res.status(200);
    res.json({
       id,
       name,
       email,
       dob,
       phoneno
    });
})
)

router.put('/updateUser/:id', protect, asyncHandler( async (req,res) => {
    const {name, email, dob, phoneno} = req.body;

    const result = await User.findByIdAndUpdate({_id : req.params.id} , {
        $set : {
            name: name,
            email: email,
            dob: dob,
            phoneno: phoneno,
        }
    } , {
        useFindAndModify : false,
    });
    
    res.status(200);
    res.json(result);
})
)

router.delete('/deleteUser/:id', protect, asyncHandler( async (req,res) => {
    
    await User.findOneAndRemove({_id: req.params.id})
    res.status(200);
    res.json({
        message: 'sucess'
    });
})
)


router.get('/getAllUsers', asyncHandler( async (req,res) => {
    const user = await User.find({}).select('-password');

    res.status(200);
    res.json(user);
})
)


// router.post('/getMe',protect , asyncHandler( async (req,res) => {
//      const{id, name, email} = req.user;//await User.findById(req.user.id);

//      res.status(200);
//      res.json({
//         id,
//         name,
//         email
//      });
// })
// )

module.exports = router;