const { url_mongo } = require("../config/env");

const mongoose = require("mongoose");

mongoose
  .connect(url_mongo, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB connected"))
  .catch((err) => console.error(err));
