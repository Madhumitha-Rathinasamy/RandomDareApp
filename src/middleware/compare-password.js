const bcrypt = require("bcryptjs");

const compare_password = async (password, userPassword) => {
  try {
    console.log(password)
    if (await bcrypt.compare(password, userPassword));
  } catch {
    return 500;
  }
};

module.exports = { compare_password };
