const bcrypt = require("bcrypt");

const hashData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    // console.log(hashData);
    return hashedData;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  hashData,
};
