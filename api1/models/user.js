const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    profile: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
}, {
    timestamps: true,
});


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
