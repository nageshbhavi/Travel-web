const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const pool = mysql.createPool({
  connectionLimit: 10,
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
  const hashedPassword = bcrypt.hashSync(password, 8);

  pool.query(sql, [name, email, hashedPassword], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM userlogin WHERE `EMAIL_ID`=?";

  pool.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      const hashedPassword = data[0].PASS_WD;
      bcrypt.compare(password, hashedPassword, (compareErr, match) => {
        if (compareErr) {
          return res.json(compareErr);
        }
        if (match) {
          return res.json("success");
        } else {
          return res.json("fail");
        }
      });
    } else {
      return res.json("fail");
    }
  });
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
