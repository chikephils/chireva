const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./CatchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return next(new ErrorHandler("Please login to continue", 403));
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message));
  }
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    let sellerToken = req.header("Authorization");
    if (!sellerToken) {
      return next(new ErrorHandler("Please login to continue", 403));
    }

    if (sellerToken.startsWith("Bearer ")) {
      sellerToken = sellerToken.slice(7, sellerToken.length).trimLeft();
    }

    const verified = jwt.verify(sellerToken, process.env.JWT_SECRET_KEY);
    req.seller = verified;
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message));
  }
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
