const AuthRoutes = require("./AuthRoute");
const ProductRoutes = require("./ProductRoute");
const CategoryRoutes = require("./CategoryRoute");
const CartRoutes = require("./CartRoute");
const OrderRoutes = require("./OrderRoute");
const UserRoutes = require("./UserRoute");
function route(app) {
  app.use("/auth", AuthRoutes);
  app.use("/category", CategoryRoutes);
  app.use("/product", ProductRoutes);
  app.use("/cart", CartRoutes);
  app.use("/order", OrderRoutes);
  app.use("/user", UserRoutes);
}
module.exports = route;
