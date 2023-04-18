const { User } = require("../../model/user_model/user");
const password_bcrypt = require("../../middleware/password-bcrypt");
const { generateAccessToken } = require("../../middleware/auth-token-generate");
const nodemailer = require("nodemailer");
const { generateOTP } = require("../../middleware/otp");
const { otp } = require("../../model/otp-model/otp");

const register = async (req, res) => {
  const password = req.body.password;
  const bcrypt_password = await password_bcrypt(password);
  try {
    let user = new User({
      full_name: req.body.full_name,
      email: req.body.email,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth,
      password: bcrypt_password,
      kyc_documents: req.body.kyc_documents,
      profile_image: req.body.profile_image,
      admin_approval: false
    });
    const OTP = new otp({
      email: req.body.email,
      otp: generateOTP(),
    });

    OTP.save();
    token = await generateAccessToken(user);
    user.auth_token = token;

    console.log(user);
    user.save();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "madhumitharathinasamy23@gmail.com",
        pass: "zhyjsdmjvorfvfdb",
      },
    });

    let mailOptions = await {
      to: req.body.email,
      subject: "Otp for registration is: ",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        OTP.otp +
        "</h1>",
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      res.status(200).json({
        status: "success",
        message: "OTP sent to your email",
        Name: user.full_name,
        Email: user.email,
        Auth_token: user.auth_token,
      });
      console.log("Success");
    });
  } catch (err) {
    res.status(203).send("Non-Authoritative Information");
  }
};

const sign_up = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log("madhu")
  const OTP = await otp.findOne({ email: req.body.email });
  console.log("kiki")
  if (!user) {
    return res.status(401).send("user not found")
  }
  if (!OTP) {
    return res.status(400).send("Otp expired");
  }
  if (OTP.otp === req.body.otp) {
    await User.findOneAndUpdate({ email: req.body.email }, { signed_up: true });
    return res.status(201).json({
      status: "success",
      message: "Successfully registered",
      User_details: {
        name: user.full_name,
        email: user.email,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
        auth_token: user.auth_token,
        role: user.role,
      },
    });
  }
};

module.exports = {
  register,
  sign_up,
};
