const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your event name"],
  },
  description: {
    type: String,
    required: [true, "Please enter your event description"],
  },
  category: {
    type: String,
    required: [true, "Please enter your event category"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  finishDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Running",
  },
  originalPrice: {
    type: Number,
    required: [true, "please enter your event product Original Price"],
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your event product Discount Price"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your event product stock"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock"],
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);
