const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const jwtSecret = "indvkrsmsnnjsskarmys";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "nagesh2003",
  database: "travelbuddy",
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json("test ok");
});

// Registration endpoint
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const sql =
    "INSERT INTO userlogin (USER_NAME, EMAIL_ID, PASS_WD) VALUES (?, ?, ?)";
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Check if email already exists
  const checkUserSql =
    "SELECT COUNT(*) as count FROM userlogin WHERE `EMAIL_ID`= ?";
  pool.query(checkUserSql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const count = results[0].count;
    if (count > 0) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      // Insert new user
      pool.query(sql, [name, email, hashedPassword], (err, data) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        } else {
          return res
            .status(201)
            .json({ message: "User registered successfully" });
        }
      });
    }
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM userlogin WHERE `EMAIL_ID`=?";

  pool.query(sql, [email], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (data.length > 0) {
      const userData = data[0];
      const hashedPassword = data[0].PASS_WD;
      bcrypt.compare(password, hashedPassword, (compareErr, match) => {
        if (compareErr) {
          return res.status(500).json({ error: "Internal server error" });
        }
        if (match) {
          jwt.sign({ email:userData.EMAIL_ID, password:hashedPassword, name:userData.USER_NAME }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token);
            return res.status(200).json(userData);
          });

        } else {
          return res.status(401).json({ error: "Invalid credentials" });
        }
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        res.status(200).json(user);
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});


// Start server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
