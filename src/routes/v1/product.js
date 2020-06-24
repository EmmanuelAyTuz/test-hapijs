"use strict";

const product_plugin = {
  //pkg: require("../../../package.json"),
  name: "product_plugin",
  version: "1.0.0",
  register: async function (server, options) {
    server.route({
      method: "GET",
      path: "/product/test",
      handler: (req, h) => {
        return { welcolme: "Hello!!!" };
      },
    });
  },
};

exports.plugin = product_plugin;
