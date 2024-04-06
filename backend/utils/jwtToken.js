//Creat Token and saving that in Cookies

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  //Optionsfor Cookies
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
    message: "Log in successful",
  });
};

module.exports = sendToken;
