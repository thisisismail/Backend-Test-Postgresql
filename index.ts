export {}; // [ solution to ] cannot redeclare block scoped variable

import dotenv from "dotenv";
dotenv.config();

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

app.listen(process.env.SERVER_PORT, (): void => {
  console.log("Connecting...");
});

client.connect((err: any) => {
  err ? console.log(err.message) : console.log("Connected");
});

app.get("/shoes", (req: any, res: any): void => {
  client.query(`Select * from shoes`, (err: any, result: any): void => {
    err ? console.log(err.message) : res.send(result.rows);
  });
});

app.post("/shoes", (req: any, res: any): void => {
  const { name, brand } = req.body;
  const queryCmd = `insert into shoes(name, brand) values('${name}','${brand}')`;
  client.query(queryCmd, (err: any, result: any): void => {
    !err ? res.send("Insert success") : res.send(err.message);
  });
});

app.put("/shoes/:id", (req: any, res: any): void => {
  const { name, brand } = req.body;
  const queryCmd = `update shoes set name='${name}', brand='${brand}' where id = '${req.params.id}'`;
  client.query(queryCmd, (err: any, result: any): void => {
    !err ? res.send("Data updated") : res.send(err.message);
  });
});

app.delete("/shoes/:id", (req: any, res: any): void => {
  client.query(
    `delete from shoes where id = '${req.params.id}'`,
    (err: any, res: any): void => {
      !err ? res.send("Data deleted") : res.send(err.message);
    }
  );
});
