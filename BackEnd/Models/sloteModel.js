const mongoose = require('mongoose');

const sloteSchema = mongoose.Schema({
    date : {
        type: String,
        required: [true, 'Please add Name']
    },
    doctor : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('Slote',sloteSchema);