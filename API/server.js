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

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: "localhost",
  user: "root",
  password: "nagesh2003",
  database: "travelbuddy",
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const sql =
    "INSERT INTO userlogin (USER_NAME, EMAIL_ID, PASS_WD) VALUES (?, ?, ?)";
  const values = [name, email, password];

  pool.query(sql, values, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql =
    "SELECT * FROM userlogin WHERE `EMAIL_ID`=? AND `PASS_WD`=?";
  const values = [email, password];

  pool.query(sql, values, (err, data) => {
    if (err) {
      return res.json(err);
    } 
    if(data.length > 0){
      return res.json("success");
    }
    else{
      return res.json("fail");
    }
  });
});

app.listen(9000);
