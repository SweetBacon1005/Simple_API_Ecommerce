const express = require('express');
const db = require('./configs/db');
const route = require('./routes');
const morgan = require('morgan');
const methodOverride = require('method-override');  
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(methodOverride('_method'));

db.connect();
route(app);
app.listen(port, () => console.log(`Server running on port ${port}`));
