const servor = require("servor");
const { port } = require("./env");

const config = {
  root: "src",
  fallback: "server.js",
  module: false,
  static: false,
  reload: true,
  browse: true,
  inject: "",
  credentials: null,
  port: port,
};

const server = async () => {
  const { url, root, protocol, port, ips } = await servor(config);
  console.log(
    "Info connection:",
    "\nURL: ",
    url,
    "\nDIR: ",
    root,
    "\nPROTOCOL: ",
    protocol,
    "\nPORT: ",
    port,
    "\nNETWORKS: ",
    ips
  );
};

server();
