const AuthRoutes = require('./auth');
function route(app) {
    app.use('/auth', AuthRoutes);
}
module.exports = route;