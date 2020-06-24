"use strict";
const Joi = require("@hapi/joi");

//Models
const User = require("../../models/User");

const user_plugin = {
  //pkg: require("../../../package.json"),
  name: "user_plugin",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/user/test",
      handler: (req, h) => {
        return { welcolme: `Hello ${options.who}!!!` };
      },
    });

    //Create
    server.route({
      method: "POST",
      path: "/user/create",
      options: {
        validate: {
          payload: Joi.object({
            username: Joi.string().min(4).max(12).required(),
            password: Joi.string().min(6).max(12).required(),
          }),
          failAction: (req, h, err) => {
            return err;
          },
          //failAction: "error",
        },
      },
      handler: async (req, h) => {
        try {
          const { username, password } = req.payload;
          const user = new User({ username });
          user.password = await user.encryptPassword(password);
          const userCreated = await user.save();
          return h.response(userCreated);
        } catch (error) {
          console.log(error.message);
        }
      },
    });

    //Read
    server.route({
      method: "GET",
      path: "/users",
      handler: async (req, h) => {
        try {
          const user = await User.find();
          return h.response(user);
        } catch (error) {
          console.log(error.message);
        }
      },
    });
    server.route({
      method: "GET",
      path: "/user/{id}",
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
            const users = await User.findById(req.params.id);
            return h.response(users);
          }
        } catch (error) {
          console.log(error.message);
        }
      },
    });

    //Update
    server.route({
      method: "PUT",
      path: "/user/{id}",
      options: {
        validate: {
          payload: Joi.object({
            username: Joi.string().min(4).max(12).optional(),
            password: Joi.string().min(6).max(12).optional(),
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
          const { username, password } = req.payload;
          const hash = await user.encryptPassword(password);

          const user = await User.findByIdAndUpdate(
            req.params.id,
            { username, hash },
            {
              new: true,
            }
          );
          return h.response(user);
        } catch (error) {
          console.log(error.message);
        }
      },
    });

    //Delete
    server.route({
      method: "DELETE",
      path: "/user/{id}",
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
          const user = await User.findByIdAndDelete(req.params.id);
          return h.response(user);
        } catch (error) {
          console.log(error.message);
        }
      },
    });
  },
};

exports.plugin = user_plugin;
