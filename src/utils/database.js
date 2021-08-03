const { Client } = require("pg"); // get data from ProgresSQL

const dotenv = require("dotenv"); // make the url encrypted
console.log(dotenv);
dotenv.config();

const connection = process.env.PGURL;

const db = new Client(connection);

module.exports = db;
