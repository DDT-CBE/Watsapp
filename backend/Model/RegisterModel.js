const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
    channelname:String,
    industry:String,
    category:String,
    state:String,
    district:String,
    channellink:String,
    subscribers:Number,
    campaignDuration:String,
    campaignsPerMonth:Number,
    pricing:Number,
    averageReaches:Number,
    numberhide:Boolean,
    approve:Boolean,
});

const RegisterModel = mongoose.model("register", RegisterSchema);

module.exports = RegisterModel;
