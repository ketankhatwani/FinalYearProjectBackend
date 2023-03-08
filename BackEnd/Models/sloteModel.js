const mongoose = require('mongoose');

const sloteSchema = mongoose.Schema({
    date : {
        type: String,
        required: [true, 'Please add Date']
    },
    startTime : {
        type: String,
        required: true
    },
    endTime : {
        type: String,
        required: true
    },
    doctorId : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    userId : {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('Slote',sloteSchema);