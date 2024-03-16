const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "travelbuddy",
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", (req, res) => {
  // const { USER_NAME, EMAIL_ID, PASS_WD } = req.body;
  // res.json({ USER_NAME, EMAIL_ID, PASS_WD });
  const sql = "INSERT INTO userlogin (`USER_NAME`,`EMAIL_ID`,`PASS_WD`) VALUES (?)";
  const values = [req.body.USER_NAME,req.body.EMAIL_ID, req.body.PASS_WD];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.listen(9000);
