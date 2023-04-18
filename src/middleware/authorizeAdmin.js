require("dotenv").config();
const Admin = require("../model/admin_model/admin");

const authorizeAdmin = async (req, res, next) => {
  try {
    console.log(req.body.adminEmail)
    const admin = await Admin.findOne({ email: req.body.adminEmail });
    if (admin.isAdmin === true) {
      next();
    } else {
      res.status(403).send(admin);
    }
  } catch (err) {
    res.status(404).send("admin field");
  }
};

module.exports = {
  authorizeAdmin,
};
