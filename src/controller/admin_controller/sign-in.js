const Admin = require("../../model/admin_model/admin");
const bcrypt = require("bcryptjs");

const sign_in = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    bcrypt.compare(req.body.password, admin.password, async (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "please enter the valid password",
        });
      } else if (result == false) {
        return res.status(400).send("Password not match")
      } else {
        console.log(result)
        await Admin.findOneAndUpdate(
          { email: req.body.email },
          { logged_in: true }
        );
        res.status(200).json({
          message: "logged in successfully",
        });
      }
    });
  } catch (err) {
    res.status(401).send("Not found");
  }
};
module.exports = { sign_in };
