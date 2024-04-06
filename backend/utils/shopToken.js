// create token and saving that in cookies
const sendShopToken = (seller, statusCode, res) => {
  const SellerToken = seller.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("seller_token", SellerToken, options).json({
    success: true,
    seller,
    SellerToken,
    message: "Shop login successful",
  });
};

module.exports = sendShopToken;
