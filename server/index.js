const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const db = require('./configs/db');
const app = express();
const port = 3000;
const route = require('./routes');
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))
db.connect();
route(app);
app.listen(port, () => console.log(`Server running on port ${port}`));
