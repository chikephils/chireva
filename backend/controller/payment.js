const express = require("express");
const router = express.Router();
const Flutterwave = require("flutterwave-node-v3");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError");
const Order = require("../model/order");
const request = require("request")

// Endpoint to verify payment
router.get(
  "/verify-payment",
  catchAsyncErrors(async (req, res, next) => {
    const { status, tx_ref, transaction_id } = req.query;

    const orders = await Order.find({ "paymentInfo.transactionId": tx_ref });
    if (!orders || orders.length === 0) {
      return next(new ErrorHandler("No ordrer Found"));
    }

    for (const order of orders) {
      const expectedAmount = order.totalPrice;
      const transactionRef = order.paymentInfo.transactionId;
      const expectedCurrency = "NGN";

      // Initialize the Flutterwave instance with  public and secret keys
      const flw = new Flutterwave(
        process.env.FLUTTERWAVE_PUBLIC_KEY,
        process.env.FLUTTERWAVE_SECRET_KEY
      );

      // Verify the payment with the Flutterwave SDK
      flw.Transaction.verify({ id: transaction_id })
        .then(async (response) => {
          if (
            response.data.status === "successful" &&
            response.data.tx_ref === transactionRef &&
            response.data.amount === expectedAmount &&
            response.data.currency === expectedCurrency
          ) {
           
            await Order.updateMany(
              { "paymentInfo.transactionId": tx_ref },
              {
                $set: {
                  "paymentInfo.status": true,
                  "paymentInfo.type": response.data.payment_type,
                  "paymentInfo.response": response,
                  paidAt: response.data.created_at,
                },
              }
            );
            res.json({
              success: true,
              message: "Payment was successfully verified.",
              status: "success",
            });
          } else {
            console.log("Payment verification failed:", response);
            res.json({
              success: false,
              message: "Payment verification failed.",
              status: "failed",
            });
          }
        })
        .catch((error) => {
          next(new ErrorHandler(error.message, 500));
        });
    }
  })
);

// Endpoint to get banks for payment
router.get(
  "/banks/flutterwave",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const options = {
        method: 'GET',
        url: "https://api.flutterwave.com/v3/banks/NG",
        headers: {
          Authorization: process.env.FLUTTERWAVE_SECRET_KEY,
        },
      };

      request(options, function (error, response, body) {
        if (error) {
          return next(new ErrorHandler(error.message, 500));
        }

        // Check if the response status code is 200 (OK)
        if (response.statusCode === 200) {
          const responseData = JSON.parse(body);
          res.json({
            success: true,
            banks: responseData.data,
          });
        } else {
          console.error('Request to Flutterwave failed with status code:', response.statusCode);
          res.json({
            success: false,
            message: 'Request to Flutterwave failed',
          });
        }
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
