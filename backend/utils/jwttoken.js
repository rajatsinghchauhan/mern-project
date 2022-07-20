const sendToken = (user, statusCode, res) => {
  const token = user.getjwtToken();
  const option = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.TOKEN_EXPIRES * 24 * 60 * 60 * 1000
    ),
  };
  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
