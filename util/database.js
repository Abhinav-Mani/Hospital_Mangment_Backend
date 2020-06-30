const oracledb=require("oracledb");

require("dotenv").config();

const pool=oracledb.createPool({
    user          : process.env.USER,
    password      : process.env.PASSWORD,
    connectString : process.env.CONNECTION_STRING,
    "poolTimeout": 60,
    "poolMin": 10,
    "poolMax": 250,
    "queueRequests": true,
    "queueTimeout": 600,
    "_enableStats": true
  });

module.exports =pool;