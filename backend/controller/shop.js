const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/CatchAsyncError");
const sendShopToken = require("../utils/shopToken");
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");

//create Shop
router.post("/create-shop", async (req, res, next) => {
  try {
    const { email, shopName, phoneNumber, address, zipCode, password, avatar } =
      req.body;

    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    const seller = {
      email: email,
      shopName: shopName,
      phoneNumber: phoneNumber,
      address: address,
      zipCode: zipCode,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      password: password,
    };

    const activationToken = createActivationToken(seller);
    const activationURL = `http://localhost:3000/seller/activation/${activationToken}`;

    //Read HTML template
    const htmlTemplatePath = path.join(
      __dirname,
      "../html/shopActivaitionMail.html"
    );
    const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

    //Replace place holders with dynamic values
    const htmlMail = htmlTemplate
      .replace("%SHOPNAME%", seller.shopName)
      .replace("%ACTIVATION_URL%", activationURL);

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        html: htmlMail,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${seller.email} to activate your account`,
      });
    } catch (err) {
      console.log(err);
      return next(new ErrorHandler(err.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//Create Activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate Seller
router.post(
  "/shop/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const {
        shopName,
        email,
        phoneNumber,
        address,
        zipCode,
        avatar,
        password,
      } = newSeller;

      let seller = await Shop.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("Seller already exists", 400));
      }

      seller = await Shop.create({
        shopName,
        email,
        phoneNumber,
        address,
        zipCode,
        avatar,
        password,
      });

      sendShopToken(seller, 201, res);

      //Read HTML template
      const htmlTemplatePath = path.join(
        __dirname,
        "../html/shopCreatedSuccess.html"
      );
      const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

      //Replace place holders with dynamic values
      const htmlMail = htmlTemplate
        .replace("%SHOPNAME%", seller.shopName)
        .replace("%LOGIN%", "https://localhost:3000/shop-login");

      try {
        await sendMail({
          email: seller.email,
          subject: "Welcome to CHIREVA Vendors",
          html: htmlMail,
        });
        res.status(201).json({
          success: true,
          message: `Shop Created successfully`,
        });
      } catch (err) {
        console.log(err);
        return next(new ErrorHandler(err.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Request forgot password
router.post(
  "/forgot-shop-password",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        return next(
          new ErrorHandler("Please provide a registered email address", 400)
        );
      }

      const shop = await Shop.findOne({ email });

      if (!shop) {
        return next(
          new ErrorHandler("Email not associated with any shop", 400)
        );
      }

      const passwordResetToken = jwt.sign(
        { _id: shop._id },
        process.env.RESET_SECRET,
        { expiresIn: "2m" }
      );

      const passwordResetURL = `http://localhost:3000/shop-password-reset/${shop._id}/${passwordResetToken}`;

      const htmlTemplatePath = path.join(
        __dirname,
        "../html/userPasswordReset.html"
      );
      const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

      const htmlMail = htmlTemplate
        .replace("%NAME%", shop.shopName)
        .replace("%RESET_URL%", passwordResetURL);

      try {
        await sendMail({
          email: shop.email,
          subject: "Password Reset",
          html: htmlMail,
        });
        res.status(201).json({
          success: true,
          message: `Please check your email: ${shop.email} to reset your account password`,
        });
      } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//verify token
router.post(
  "/verify-token-shop",
  catchAsyncError(async (req, res, next) => {
    try {
      const { resetToken } = req.body;

      if (!resetToken) {
        return next(new ErrorHandler("No Token found", 400));
      }
      try {
        const decoded = jwt.verify(resetToken, process.env.RESET_SECRET);

        const shop = await Shop.findById(decoded._id);

        if (!shop) {
          res.json({
            success: false,
            message: "Invalid Shop",
          });
        } else {
          res.json({
            success: true,
            message: "Token is Valid",
          });
        }
      } catch (error) {
        res.json({
          success: false,
          message: "Token has expired or is Invalid",
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Create new password
router.post(
  "/new-shop-password/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const updatedShop = await Shop.findByIdAndUpdate(id, {
        password: hashedPassword,
      });

      if (!updatedShop) {
        return next(new ErrorHandler("Shop not Found", 400));
      }

      await updatedShop.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login Seller
router.post(
  "/shop-login",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields", 400));
      }
      const seller = await Shop.findOne({ email });

      if (!seller) {
        return next(new ErrorHandler("Seller does not exist", 400));
      }

      const isPasswordValid = await bcrypt.compare(password, seller.password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Incorrect Password", 400));
      }
      const sellerToken = jwt.sign(
        { id: seller._id },
        process.env.JWT_SECRET_KEY
      );
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res.cookie("seller_token", sellerToken, options);

      delete seller.password;
      res
        .status(200)
        .json({ sellerToken, seller, message: "Logged in sucessfully" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller doesn't exist", 400));
      }
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//logout Seller
router.get(
  "/logout",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Logged out Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/update-shop-avatar",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      let existsSeller = await Shop.findById(req.seller._id);

        const imageId = existsSeller.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
        });

        existsSeller.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };

  
      await existsSeller.save();

      res.status(200).json({
        success: true,
        seller:existsSeller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update Seller Info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { shopName, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.shopName = shopName;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;
      shop.description = description;
      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);

//get All seller for Admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//delete Seller for Admin
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const sellerId = req.params.id;
      const seller = await Shop.findById(sellerId);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this Id", 400));
      }
      seller.avatar((imageUrls) => {
        const fileName = imageUrls;
        const filePath = `uploads/${fileName}`;

        fs.unlink(filePath, (error) => {
          if (error) {
            return next(new ErrorHandler("Erroe trying to delete shop Avatar"));
          }
        });
      });
      await Shop.findByIdAndDelete(sellerId);

      res.status(201).json({
        success: true,
        message: "Shop deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Update seller withdraw methods
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Delete seller withdraw method --- seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
