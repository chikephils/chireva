const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError");
const express = require("express");
const Withdraw = require("../model/withdraw");
const sendMail = require("../utils/sendMail");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

//create withdraw request for seller
router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;
      const { bankName, accountNumber } = req.seller.withdrawMethod;
      const shop = await Shop.findById(req.seller._id);

      // MongoDB will automatically generate a unique _id for the Withdraw document
      const withdrawalId = new mongoose.Types.ObjectId();

      const data = {
        _id: withdrawalId,
        seller: req.seller,
        amount,
        bank: bankName,
        accountNumber,
      };

      const transaction = {
        _id: withdrawalId,
        amount: amount,
        bank: bankName,
        accountNumber: accountNumber,
      };

      const withdraw = await Withdraw.create(data);

      shop.availableBalance = shop.availableBalance - amount;
      shop.transactions = [...shop.transactions, transaction];

      await shop.save();

      // Now that all the database operations are completed, send the email
      const htmlTemplatePath = path.join(
        __dirname,
        "../html/withdrawalRequest.html"
      );
      const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

      const htmlMail = htmlTemplate
        .replace("%SHOPNAME%", shop.shopName)
        .replace("%AMOUNT%", transaction.amount)
        .replace("%BANKNAME%", bankName)
        .replace("%ACCOUNTNUMBER%", accountNumber);

      try {
        await sendMail({
          email: req.seller.email,
          subject: "Withdrawal Request",
          html: htmlMail,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get all Withdrawals  for admin
router.get(
  "/get-all-withdrawal-request",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdrawals = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdrawals,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update withdraw request for admin
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdrawalId = req.params.id;
      const { sellerId } = req.body;

      const withdrawal = await Withdraw.findByIdAndUpdate(
        withdrawalId,
        {
          status: "succeeded",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await Shop.findById(sellerId);

      const transactionToUpdate = seller.transactions.find(
        (transaction) => transaction._id.toString() === withdrawalId
      );

      if (transactionToUpdate) {
        transactionToUpdate.status = "succeeded";
        transactionToUpdate.updatedAt = Date.now();
      }

      await seller.save({ validateBeforeSave: false });

      const htmlTemplatePath = path.join(
        __dirname,
        "../html/withdrawalSuccess.html"
      );
      const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

      //Replace place holders with dynamic values
      const htmlMail = htmlTemplate
        .replace("%SHOPNAME%", seller.shopName)
        .replace("%AMOUNT%", withdrawal.amount)
        .replace("%BANKNAME%", withdrawal.bank)
        .replace("%ACCOUNTNUMBER%", withdrawal.accountNumber);

      try {
        await sendMail({
          email: seller.email,
          subject: "Payment Confirmation",
          html: htmlMail,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(201).json({
        success: true,
        withdrawal,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
