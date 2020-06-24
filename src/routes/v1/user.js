"use strict";

const user_plugin = {
  //pkg: require("../../../package.json"),
  name: "user_plugin",
  version: "1.0.0",
  register: async function (server, options) {
    server.route({
      method: "GET",
      path: "/user/test",
      handler: (req, h) => {
        return { welcolme: `Hello ${options.who}!!!` };
      },
    });
  },
};

exports.plugin = user_plugin;
