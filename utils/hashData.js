const bcrypt = require("bcrypt");
const { logger } = require("./logger");

const hashData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    // console.log(hashData);
    return hashedData;
  } catch (err) {
    console.log(err);
  }
};




const verifyData = async (unhashedData, hashedData) => {
  try {
    const match = await bcrypt.compare(unhashedData, hashedData);
    return match;
  }
  catch (err) {
    logger.info('error occurs', err);
  }
}

module.exports = {
  hashData,
  verifyData
};