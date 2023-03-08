const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./Config/db');
const port = process.env.PORT || 5000;
const {errorHandler} = require('./MiddeleWare/errorMiddeleware');
var cors = require('cors')
 
connectDB();

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/user',require('./routes/userRoutes'));
app.use('/doctor',require('./routes/doctorRoutes'));
app.use('/slote',require('./routes/sloteRoutes'));
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server stated on port: '+ port.green)
});