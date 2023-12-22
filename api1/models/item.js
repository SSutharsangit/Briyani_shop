const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = ItemModel;
