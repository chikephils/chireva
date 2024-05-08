const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: [true, "Please Enter a Shop Name"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please Enter Shop Phone Number"],
  },
  email: {
    type: String,
    unique: [true, "Please Enter shop email"],
  },
  password: {
    type: String,
    required: [true, "Please select a Password"],
    minLength: [6, "Password must be longer than 6 Characters"],
  },
  address: {
    type: String,
    required: [true, "Please enter Shop Address"],
  },
  description: {
    type: String,
  },
  zipCode: {
    type: Number,
    required: [true, "Please enter Shop Zip Code"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  withdrawMethod: {
    type: Object,
  },
  availableBalance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      amount: {
        type: Number,
        required: true,
      },
      bank: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        default: "Processing",
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
      },
    },
  ],
  role: {
    type: String,
    default: "seller",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//hash Password
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY);
};

//compare password
shopSchema.methods.comparePaswword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);
