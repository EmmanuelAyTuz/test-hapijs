const Hapi = require("@hapi/hapi");
const { host, port } = require("../config/env");
const { strategy } = require("./helpers/auth");

require("./database"); //Mongodb

const init = async () => {
  //Create server
  const server = new Hapi.Server({
    port: port,
    host: host,
  });

  await server.start();

  //Routes no ver
  server.route({
    method: ["GET", "POST"],
    path: "/test/{id?}", //{param} is required and {param?} is optional
    handler: (req, h) => {
      const user = req.params.id ? req.params.id : "No param";
      const body = req.body ? req.body : "No body";
      return {
        welcome: "This text is a test!",
        params: req.params,
        body: body,
        single: user,
      };
    },
  });

  //Routes ver
  const user = require("./routes/v1/user"); //Plugin
  const product = require("./routes/v1/product"); //Plugin
  const admin = require("./routes/admin/v1/user"); //Plugin

  await server.register(
    [
      {
        plugin: user,
        options: { who: "User" },
      },
      {
        plugin: product,
        options: {},
      },
    ],
    { routes: { prefix: "/v1" } }
  );

  await server.register(
    [
      {
        plugin: admin,
        options: { who: "Admin" },
      },
    ],
    { routes: { prefix: "/v1" } }
  );

  /*server.route({
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {},
  });*/

  strategy(server);

  console.log("Server is running on ", server.info);
};

init();
