const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
    auth_id: { type: mongoose.Schema.Types.ObjectId, ref: "SignupModel" },
    name: { type: String, required: true },
    paid: { type: Boolean, default: false },
    credits: { type: Number, default: 5 },
    visibelGroups:[String]
}, { timestamps: true });

const UserInfoModel = mongoose.model("user_info", UserInfoSchema);
module.exports = UserInfoModel;
