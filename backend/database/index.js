const moongose = require('mongoose');
const {MONGODB_CONNECTCION_STRING} = require('../config')

const dbConnect = async () => {
    try{
        moongose.set('strictQuery', false);
        const conn = await moongose.connect(MONGODB_CONNECTCION_STRING)
        console.log(`database connected to host: ${conn.connection.host}`)
    }catch(error){
        console.log(`Error: ${error}`);
    }
}

module.exports = dbConnect;