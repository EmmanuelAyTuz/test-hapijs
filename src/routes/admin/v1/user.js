"use strict";
const Joi = require("@hapi/joi");
const { infoSession } = require("../../../helpers/isAdmin");
const { encryptPassword } = require("../../../helpers/bpassword");

//Models
const User = require("../../../models/User");

const user_plugin = {
  //pkg: require("../../../package.json"),
  name: "admin_plugin",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/admin/test",
      handler: (req, h) => {
        if (!infoSession().isAdmin) {
          return h.response({ info: "You are not a Admin" });
        }
        return { info: `Hello ${options.who}!!!` };
      },
    });

    //Create
    server.route({
      method: "POST",
      path: "/admin/user/create",
      options: {
        validate: {
          payload: Joi.object({
            username: Joi.string().min(4).max(12).required(),
            password: Joi.string().min(6).max(12).required(),
            isAdmin: Joi.boolean().optional().default(false),
          }),
          failAction: (req, h, err) => {
            return err;
          },
          //failAction: "error",
        },
      },
      handler: async (req, h) => {
        try {
          if (!infoSession().isAdmin) {
            return h.response({ info: "You are not a Admin" });
          }
          const { username, password, isAdmin } = req.payload;
          const user = new User({ username });
          user.password = await encryptPassword(password);
          user.isAdmin = isAdmin;
          const userCreated = await user.save();
          return h.response(userCreated).code(201);
        } catch (error) {
          console.log(error.message);
        }
      },
    });

    //Read
    server.route({
      method: "GET",
      path: "/admin/user/all",
      handler: async (req, h) => {
        try {
          if (!infoSession().isAdmin) {
            return h.response({ info: "You are not a Admin" });
          }
          const user = await User.find();
          return h.response(user).code(200); //Show all fields
        } catch (error) {
          console.log(error.message);
        }
      },
    });
    server.route({
      method: "GET",
      path: "/admin/user/{id}",
      options: {
        validate: {
          params: Joi.object({ id: Joi.string().alphanum() }),
          failAction: async (req, h, err) => {
            return err;
          },
          //failAction: "error",
        },
      },
      handler: async (req, h) => {
        try {
          if (req.params.id) {
            if (!infoSession().isAdmin) {
              return h.response({ info: "You are not a Admin" });
            }
            const users = await User.findById(req.params.id);
            return h.response(users).code(200);
          }
        } catch (error) {
          console.log(error.message);
        }
      },
    });

    //Update
    server.route({
      method: "PUT",
      path: "/admin/user/{id}",
      options: {
        validate: {
          payload: Joi.object({
            username: Joi.string().min(4).max(12).required(),
            password: Joi.string().min(6).max(12).required(),
            isAdmin: Joi.boolean().optional().default(false),
          }),
          params: Joi.object({ id: Joi.string().alphanum() }),
          failAction: async (req, h, err) => {
            return err;
          },
          //failAction: "error",
        },
      },
      handler: async (req, h) => {
        try {
          if (!infoSession().isAdmin) {
            return h.response({ info: "You are not a Admin" });
          }
          const { username, password, isAdmin } = req.payload;
          const user = await User.findByIdAndUpdate(
            req.params.id,
            {
              username: username,
              password: await encryptPassword(password),
              isAdmin: isAdmin,
            },
            { new: true }
          );
          return h.response(user).code(202);
        } catch (error) {
          console.log(error.message);
        }
      },
    });

    //Delete
    server.route({
      method: "DELETE",
      path: "/admin/user/{id}",
      options: {
        validate: {
          params: Joi.object({ id: Joi.string().alphanum() }),
          failAction: async (req, h, err) => {
            return err;
          },
          //failAction: "error",
        },
      },
      handler: async (req, h) => {
        try {
          if (!infoSession().isAdmin) {
            return h.response({ info: "You are not a Admin" });
          }
          const user = await User.findByIdAndDelete(req.params.id);
          return h.response(user).code(204);
        } catch (error) {
          console.log(error.message);
        }
      },
    });
  },
};

exports.plugin = user_plugin;
