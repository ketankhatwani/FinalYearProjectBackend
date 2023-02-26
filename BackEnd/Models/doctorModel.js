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
        type : String,
        required: [true, 'Please Select Gender']
    },
    dob : {
        type : String,
        required: [true, 'Please enter Berth Date']
    },
    file : {
        data: Buffer,
        contentType: String 
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