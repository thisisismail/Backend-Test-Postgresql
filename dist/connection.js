"use strict";
const { Client } = require("pg");
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "ismail11",
    database: "crud",
});
module.exports = client;
