const { User } = require("../../model/user_model/user")
const Admin = require("../../model/admin_model/admin")

const approve_user = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { admin_approval: true }
    );
    console.log(user)
    if (!user) {
      return res.status(404).send("User not found")
    }
    res.status(200).send(`${req.body.email} is a user now`)
  } catch (er) {
    console.log(er)
    return res.status(400).send("Not updated")
  }
}

const reject_user = async (req, res) => {
  try {
    const users = await User.findOne({ email: req.body.email });
    const usercount = users.count += 1;
    await User.findOneAndUpdate(
      { email: req.body.email },
      { count: usercount }
    );
    res.status(200).send(`${req.body.email} kyc document is not approved`)
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
}

module.exports = {
  approve_user,
  reject_user,
};