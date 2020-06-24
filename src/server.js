const Hapi = require("@hapi/hapi");
const { host, port } = require("../config/env");

require("./database"); //Mongodb

const init = async () => {
  const server = new Hapi.Server({
    port: port,
    host: host,
  });

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

  /*server.route({
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {},
  });*/

  //Routes ver
  const user = require("./routes/v1/user"); //Plugin
  const product = require("./routes/v1/product"); //Plugin

  await server.register(
    [
      {
        plugin: user,
        options: { who: "Dev" },
      },
      {
        plugin: product,
        options: {},
      },
    ],
    { routes: { prefix: "/v1" } }
  );

  await server.start();

  console.log("Server is running on ", server.info);
};

init();
