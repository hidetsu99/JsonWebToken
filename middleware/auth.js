const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const {id, username} = decode
    req.user = {id, username}
    next();
  } catch (error) {
    throw new CustomAPIError("Unauthorized token", 401);
  }

  console.log(req.headers.authorization);
};

module.exports = authenticationMiddleware;
