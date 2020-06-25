const bcrypt = require("bcryptjs");

const bpassword = {};

bpassword.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

bpassword.matchPassword = async (inpass, dbpass) => {
  return await bcrypt.compare(inpass, dbpass);
};

module.exports = bpassword;
