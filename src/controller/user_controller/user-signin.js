const { User } = require("../../model/user_model/user");
const bcrypt = require("bcryptjs");

const sign_in = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.admin_approval == true) {
      bcrypt.compare(req.body.password, user.password, async (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "please enter the valid password",
          });
        } else if (result === false) {
          return res.status(400).send("Password invalid")
        } else {
          await User.findOneAndUpdate(
            { email: req.body.email },
            { logged_in: true }
          );
          res.status(200).json({
            message: "logged in successfully",
          });
        }
      });
    } else {
      res.status(406).json({
        status: "failed",
        message: "Wait until admin approve your request"
      })
    }
  } catch (err) {
    res.status(401).send("Not found");
  }
};
module.exports = { sign_in };
