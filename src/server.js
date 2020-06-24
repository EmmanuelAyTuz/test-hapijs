const Hapi = require("@hapi/hapi");
const { host, port } = require("../config/env");

const init = async () => {
  const server = new Hapi.Server({
    port: port,
    host: host,
  });

  //Routes no ver
  server.route({
    method: "GET",
    path: "/test",
    handler: (req, h) => {
      return { welcome: "This text is a test!" };
    },
  });

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
