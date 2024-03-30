const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./CatchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    const { user_token } = req.cookies;
    if (!user_token) {
      return next(new ErrorHandler("Please Login to Continue", 401));
    }

    const decoded = jwt.verify(user_token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Please Login to Continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  next();
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resources!`)
      );
    }
    next();
  };
};
