const mongoose = require('mongoose');

const mixdata = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:String,
    age:Number,
    heartrate:Number,

});


module.exports = Mixdata = mongoose.model('mixdata',mixdata);