const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected: ${con.connection.host}`.cyan);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;