const oracledb=require("oracledb");

require("dotenv").config();

const pool=oracledb.createPool({
    user          : process.env.USER,
    password      : process.env.PASSWORD,
    connectString : process.env.CONNECTION_STRING
  });

module.exports =pool;