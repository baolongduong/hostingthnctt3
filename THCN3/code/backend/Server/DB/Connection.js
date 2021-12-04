const mongoose = require('mongoose');

const URI = "mongodb+srv://dbHeartBeat:dbHeartBeat@cluster0.gdn2e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () =>{
    await mongoose.connect(URI);
    console.log('db connected...');
};
module.exports = connectDB;
