const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401).send("unauthorized");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = auth
