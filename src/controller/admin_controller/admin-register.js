const Admin = require("../../model/admin_model/admin");
const password_bcrypt = require("../../middleware/password-bcrypt");
const { generateAccessToken } = require("../../middleware/auth-token-generate");

const add_admin = async (req, res) => {
  const password = req.body.password;
  const bcrypt_password = await password_bcrypt(password);
  try {
    let admin = new Admin({
      full_name: req.body.full_name,
      email: req.body.email,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth,
      password: bcrypt_password,
    });
    token = await generateAccessToken(admin);
    admin.auth_token = token;
    admin.save();
    console.log(admin)
    res.status(201).json({
      status: "success",
      Admin_created: {
        name: admin.full_name,
        email: admin.email,
        gender: admin.gender,
        date_of_birth: admin.date_of_birth,
        auth_token: admin.auth_token,
        role: admin.role,
      },
    });

  } catch (err) {
    res.status(203).send("Non-Authoritative Information");
  }

};

module.exports = {
  add_admin,
};
