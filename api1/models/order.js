const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  user: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: 'https://example.com/default-profile.png',
    },
  },
  products: [
    {
      item: {
        type: String,  
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
