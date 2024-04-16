const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_CONNECTCION_STRING = process.env.CONNECTION_STRING;

module.exports = {
    PORT,
    MONGODB_CONNECTCION_STRING
}