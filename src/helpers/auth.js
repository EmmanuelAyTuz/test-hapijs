const Cookie = require("@hapi/cookie");
const User = require("../models/User");
const { setSession } = require("./isAdmin");
const { matchPassword } = require("./bpassword");
const auth = {};
let id = "";

auth.strategy = async (server) => {
  await server.register(Cookie);
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "sid-hapijs",
      password: "!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6",
      isSecure: false,
    },
    redirectTo: "/nocredentials",
    validateFunc: async (req, session) => {
      const user = await User.findById(session.id);
      const flag = user.id == id ? true : false;
      if (!flag) {
        return { valid: false };
      }
      setSession(session);
      return { valid: true, credentials: user };
    },
  });

  server.auth.default("session");

  server.route([
    {
      method: ["GET", "POST", "PUT", "DELETE"],
      path: "/nocredentials",
      handler: (req, h) => {
        return h
          .response({
            info: "No credentials, please login",
            id: req.info.id,
            from: req.route.path,
            method: req.method,
          })
          .code(401);
      },
      options: {
        auth: {
          mode: "try",
        },
      },
    },
    {
      method: ["GET", "POST", "PUT", "DELETE"],
      path: "/",
      handler: async (req, h) => {
        return h
          .response({
            info: "Welcome!!!",
            id: req.info.id,
            from: req.route.path,
            method: req.method,
          })
          .code(200);
      },
    },
    {
      method: "POST",
      path: "/login",
      handler: async (req, h) => {
        const { username, password } = req.payload;
        const account = await User.find({ username: username });
        if (
          !account[0] ||
          !(await matchPassword(password, account[0].password))
        ) {
          return h
            .response({
              info: "No login",
              id: req.info.id,
              from: req.route.path,
              method: req.method,
            })
            .code(404);
        }

        id = account[0]._id;
        req.cookieAuth.set({ id: id, isAdmin: account[0].isAdmin });
        return h
          .response({
            info: "Login",
            id: req.info.id,
            from: req.route.path,
            method: req.method,
          })
          .code(200);
      },
      options: {
        auth: {
          mode: "try",
        },
      },
    },
    {
      method: "POST",
      path: "/init", //Remove after
      handler: async (req, h) => {
        try {
          const user = new User({ username: "Admin" });
          user.password = await user.encryptPassword("Admin");
          user.isAdmin = true;
          const create = await user.save((err) => {});
          if (!create) {
            return h
              .response({
                info: "Problems in the creation",
                id: req.info.id,
                from: req.route.path,
                method: req.method,
              })
              .code(500);
          }
          return h
            .response({
              info: "Admin has been created, username & password is Admin",
              id: req.info.id,
              from: req.route.path,
              method: req.method,
            })
            .code(201);
        } catch (error) {
          console.log(error.message);
        }
      },
      options: {
        auth: {
          mode: "try",
        },
      },
    },
  ]);
};

module.exports = auth;
