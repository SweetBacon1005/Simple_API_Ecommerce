const AuthRoutes = require('./AuthRoute');
const ProductRoutes = require('./ProductRoute');
const CategoryRoutes = require('./CategoryRoute');
function route(app) {
    app.use('/auth', AuthRoutes);
    app.use('/category', CategoryRoutes);
    app.use('/product', ProductRoutes);
}
module.exports = route;