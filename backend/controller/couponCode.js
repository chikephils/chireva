const express = require("express");
const catchAsyncErrors = require("../middleware/CatchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const router = express.Router();
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const CouponCode = require("../model/couponCode");

//create CouisCoupon
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid:", 400));
      } else {
        const isCouponCodeExists = await CouponCode.find({
          name: req.body.name,
        });
        if (isCouponCodeExists.length > 0) {
          return next(new ErrorHandler("Coupon Code already exists", 400));
        }
        const couponData = req.body;
        couponData.shop = shop;
        const couponCode = await CouponCode.create(couponData);

        res.status(201).json({
          success: true,
          couponCode,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all Coupons
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete Coupon code from shop
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon Code doesn't exists!", 400));
      }
      res.status(201).json({
        success: true,
        couponCode,
        message: "Coupon Code deleted Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findOne({ name: req.params.name });

      if (!couponCode) {
        return next(new ErrorHandler("Coupon Code doesn't exists!", 400));
      }
      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all copons for Admin
router.get(
  "/get-all-coupon",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupons = await CouponCode.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        coupons,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

module.exports = router;
