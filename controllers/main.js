const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  if (!username || !password) {
    throw new CustomAPIError("Didnt provide username or password", 400);
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  res.status(200).send({ msg: `user ${username} created`, token });
};
const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200)
    .json({
      msg: `Hello ${req.user.username}, here is your authorized data: ${luckyNumber}`,
      secret: "assdd",
    });
};
module.exports = {
  login,
  dashboard,
};
