const mongoose = require("mongoose");

const WatsappGroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    groupLink: { type: String, required: true },
    groupDescription: { type: String, required: true },
    joiningStatus: { type: String, required: true },
    groupMembers: { type: Number, required: true },
    state: { type: String, required: true }, // Added state field
    district: { type: String, required: true }, // Added district field
    industry: { type: String, required: true }, // Added industry field
    category: { type: String, required: true }, // Added category field
    approve:{type:Boolean}
});

const WatsappGroupModel = mongoose.model("WatsappGroup", WatsappGroupSchema);

module.exports = WatsappGroupModel;
