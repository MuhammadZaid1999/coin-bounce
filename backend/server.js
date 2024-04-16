const express = require('express');
const dbConnect = require('./database');
const {PORT} = require('./config');
const router = require('./routes');
const errorHandler = require('./middlewares/ErrorHandler');

const app = express();

app.use(express.json());

app.use(router);
app.use(errorHandler);

dbConnect();

app.listen(PORT, console.log(`backend is running on port: ${PORT}`));
