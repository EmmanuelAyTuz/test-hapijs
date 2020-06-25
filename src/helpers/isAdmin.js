const { isSchema } = require("@hapi/joi");

const isAdmin = {};
let user = {};

isAdmin.setSession = (session) => {
  user = session;
};

isAdmin.infoSession = () => user;

module.exports = isAdmin;
