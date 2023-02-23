const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please add Name']
    },
    email : {
        type: String,
        required: [true, 'Please add Email'],
        unique: true
    },
    phoneno : {
        type: String,
        required: [true, 'Please add Phone No.']
    },
    gender : {
        type : Boolean,
        required: [true, 'Please Select Gender']
    },
    dob : {
        type : Date,
        required: [true, 'Please enter Berth Date']
    },
    education : [String],
    experience : [String],
    awards : [String],
    clinic : [String],
    password : {
        type: String,
        required: [true, 'Please add Password']
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('Doctor',doctorSchema);