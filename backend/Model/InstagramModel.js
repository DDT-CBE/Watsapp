const mongoose = require("mongoose");

const InstagramSchema = new mongoose.Schema({
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
    type:String,
    averageReaches:Number,
    numberhide:Boolean,
    approve:Boolean,
});

const InstagramModel = mongoose.model("instagram", InstagramSchema);

module.exports = InstagramModel;
