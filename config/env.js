const dotenv = require("dotenv");
dotenv.config();

//Environments of the project
module.exports = {
  url_mongo: process.env.MONGO_DB,
  port: process.env.PORT,
};
