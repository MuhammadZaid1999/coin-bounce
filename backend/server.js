const express = require('express');
const dbConnect = require('./database');
const {PORT} = require('./config');
const router = require('./routes');
const errorHandler = require('./middlewares/ErrorHandler');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(router);

dbConnect();

app.use('/storage', express.static('storage'));

app.use(errorHandler);

app.listen(PORT, console.log(`backend is running on port: ${PORT}`));