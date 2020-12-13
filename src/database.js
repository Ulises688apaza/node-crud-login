const mysql = require('mysql');

const { promisify} = require('util');

const { database } = require('./keys'); 

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ERR_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONECCTIONS')
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED',)
            console.warn('Please enable the database')
        }
    }

    if(connection) connection.release();
    console.log('DB is Connected :-)')
    return;
})

//PROMISFY POOL QUERYS
pool.query = promisify(pool.query);

module.exports = pool;
