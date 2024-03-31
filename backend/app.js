const express = require("express");
const ErrorHandler = require("./middleware/Error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: ["https://chireva-frontend.vercel.app","http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

//import Routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/couponCode");
const order = require("./controller/order");
const messages = require("./controller/messages");
const conversation = require("./controller/conversation");
const payment = require("./controller/payment");
const withdraw = require("./controller/withdraw");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/order", order);
app.use("/api/v2/messages", messages);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);

//For Error Handling
app.use(ErrorHandler);

app.use("/test", (req, res) => {
  res.send("Hello world!");
});

module.exports = app;
