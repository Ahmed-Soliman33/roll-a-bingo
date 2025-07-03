const packageRoute = require("./packageRoute");
const authRoute = require("./authRoute");

exports.mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/packages", packageRoute);
};
