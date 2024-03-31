const AuthRoutes = require("./AuthRoute");
const ProductRoutes = require("./ProductRoute");
const CategoryRoutes = require("./CategoryRoute");
const CartItemRoutes = require("./CartItemRoute");
const OrderRoutes = require("./OrderRoute");
function route(app) {
  app.use("/auth", AuthRoutes);
  app.use("/category", CategoryRoutes);
  app.use("/product", ProductRoutes);
  app.use("/cart-item", CartItemRoutes);
  app.use("/order", OrderRoutes);
}
module.exports = route;
