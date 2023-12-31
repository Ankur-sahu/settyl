const jwt = require("jsonwebtoken");

function validateCredentials(req, res, next) {
  console.log(req.header("X-Auth-Token")," from middleware updated")
  const token = req.header("X-Auth-Token");
  if (!token) return res.status(403).send("Access denied. No token available");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    console.log("decoded....", decoded);
    next();
  } catch (err) {
    return res.status(400).json({
      msg: "Invalid Token",
      error: err.message,
    });
  }
}

module.exports = {
  validateCredentials,
};
