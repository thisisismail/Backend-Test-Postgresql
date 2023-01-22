"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg = require("pg");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// //localhost
// const client = require("./connection");
// //elephantsql
const conString = `${process.env.DB_URL}`;
const client = new pg.Client(conString);
app.use(express.json());
app.listen(process.env.SERVER_PORT, () => {
    console.log("Connecting...");
});
client.connect((err) => {
    err ? console.log(err.message) : console.log("Connected");
});
app.get("/shoes", (req, res) => {
    client.query(`Select * from shoes`, (err, result) => {
        err ? console.log(err.message) : res.send(result.rows);
    });
});
app.post("/shoes", (req, res) => {
    const { name, brand } = req.body;
    const queryCmd = `insert into shoes(name, brand) values('${name}','${brand}')`;
    client.query(queryCmd, (err, result) => {
        !err ? res.send("Insert success") : res.send(err.message);
    });
});
app.put("/shoes/:id", (req, res) => {
    const { name, brand } = req.body;
    const queryCmd = `update shoes set name='${name}', brand='${brand}' where id = '${req.params.id}'`;
    client.query(queryCmd, (err, result) => {
        !err ? res.send("Data updated") : res.send(err.message);
    });
});
app.delete("/shoes/:id", (req, res) => {
    client.query(`delete from shoes where id = '${req.params.id}'`, (err, res) => {
        !err ? res.send("Data deleted") : res.send(err.message);
    });
});
