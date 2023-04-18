
const bcrypt = require("bcryptjs");

const password_bcrypt = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    return err;
  }
}

module.exports = password_bcrypt;