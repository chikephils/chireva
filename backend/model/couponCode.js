const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Coupon code name"],
    unique: true,
  },
  value: {
    type: Number,
    required: [true, "Please Enter Coupon Code value"],
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  selectedProduct: {
    type: String,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);
