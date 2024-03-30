const express = require("express");
const User = require("../model/user");
const path = require("path");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");

//Create User
router.post("/create-user", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, avatar } = req.body;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    const activationToken = createActivationToken(user);
    const activationURL = `http://localhost:3000/activation/${activationToken}`;

    //Read HTML template file
    const htmlTemplatePath = path.join(
      __dirname,
      "../html/userActivationMail.html"
    );
    const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

    //Replace place holders with dynamic values
    const htmlMail = htmlTemplate
      .replace("%FIRST_NAME%", user.firstName)
      .replace("%LAST_NAME%", user.lastName)
      .replace("%ACTIVATION_URL%", activationURL);

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your Account",
        html: htmlMail,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
      });
    } catch (err) {
      console.log(err);
      return new ErrorHandler(err.message, 500);
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create Activation Token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate User
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      console.log(newUser);

      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { firstName, lastName, email, password, avatar } = newUser;

      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        firstName,
        lastName,
        email,
        avatar,
        password,
      });
      sendToken(user, 201, res);

      const htmlTemplatePath = path.join(
        __dirname,
        "../html/userCreatedSuccess.html"
      );
      const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

      //Replace place holders with dynamic values
      const htmlMail = htmlTemplate
        .replace("%FIRST_NAME%", user.firstName)
        .replace("%LAST_NAME%", user.lastName)
        .replace("%LOGIN%", "https://localhost:3000/login");

      try {
        await sendMail({
          email: user.email,
          subject: "Welcome to CHIREVA",
          html: htmlMail,
        });
        res.status(201).json({
          success: true,
          message: `User created successfully`,
        });
      } catch (err) {
        console.log(err);
        return new ErrorHandler(err.message, 500);
      }
    } catch (error) {
      console.log(error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Request forgot password
router.post(
  "/forgot-password",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        return next(
          new ErrorHandler("Please Provide a registered Email address", 400)
        );
      }

      const user = await User.findOne({ email });

      if (!user) {
        return next(
          new ErrorHandler("Email not associated with any account", 400)
        );
      }

      const passwordResetToken = jwt.sign(
        { _id: user._id },
        process.env.RESET_SECRET,
        {
          expiresIn: "2m",
        }
      );
      const passwordResetURL = `http://localhost:3000/password-reset/${user._id}/${passwordResetToken}`;

      const htmlTemplatePath = path.join(
        __dirname,
        "../html/userPasswordReset.html"
      );
      const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

      const htmlMail = htmlTemplate
        .replace("%NAME%", user.firstName)
        .replace("%RESET_URL%", passwordResetURL);

      try {
        await sendMail({
          email: user.email,
          subject: "Password Reset",
          html: htmlMail,
        });
        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to reset your account password`,
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
  "/verify-token",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { resetToken } = req.body;

      if (!resetToken) {
        return next(new ErrorHandler("No Token Found", 400));
      }

      try {
        const decoded = jwt.verify(resetToken, process.env.RESET_SECRET);

        const user = await User.findById(decoded._id);

        if (!user) {
          res.json({
            success: false,
            message: "Invalid User",
          });
        } else {
          res.json({
            success: true,
            message: "Token is valid",
          });
        }
      } catch (error) {
        res.json({
          success: false,
          message: "Token has expired or is invalid",
        });
      }
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  })
);

//create new password
router.post(
  "/new-password/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const updatedUser = await User.findByIdAndUpdate(id, {
        password: hashedPassword,
      });

      if (!updatedUser) {
        return next(new ErrorHandler("User not found", 404));
      }

      await updatedUser.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields", 400));
      }
      const user = await User.findOne({ email });

      if (!user) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Incorrect Password", 400));
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      res.cookie("user_token", token, options);

      delete user.password;
      res.status(200).json({ token, user, message: "Logged in sucessfully" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//log out User
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("user_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, firstName, lastName } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return next(new ErrorHandler("User not Found", 400));
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      user.firstName = firstName;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.lastName = lastName;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existingUser = await User.findById(req.user.id);
      if (req.body.avatar !== "") {
        const imageId = existingUser.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
        });

        existingUser.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      await existingUser.save();
      res.status(200).json({
        success: true,
        user: existingUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//update user addressses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }
      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//delete user Address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );
      const user = await User.findById(userId);
      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update user Password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is Incorrect", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password do not Match", 400));
      }

      user.password = req.body.newPassword;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//find user Information with userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//all User for admin
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//delete User for admin
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.params.id;
      const userData = await User.findById(userId);

      if (!userData) {
        return next(new ErrorHandler("User not found with this ID", 400));
      }
      userData.avatar((imageUrls) => {
        const fileName = imageUrls;
        const filePath = `uploads/${fileName}`;

        fs.unlink(filePath, (error) => {
          if (error) {
            return next(
              new ErrorHandler(
                "Error Occured trying to delete user avatar",
                500
              )
            );
          }
        });
      });
      await User.findByIdAndDelete(userId);

      res.status(201).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
