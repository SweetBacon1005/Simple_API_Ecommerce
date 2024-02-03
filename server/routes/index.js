const AuthRoutes = require('./auth');
const ProductRoutes = require('./product');
function route(app) {
    app.use('/auth', AuthRoutes);
    app.use('/product', ProductRoutes);
}
module.exports = route;