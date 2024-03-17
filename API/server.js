// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql");
// const bcrypt = require("bcryptjs");

// const app = express();

// app.use(express.json());
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "nagesh2003",
//   database: "travelbuddy",
// });

// app.get("/test", (req, res) => {
//   res.json("test ok");
// });

// app.post("/register", (req, res) => {
//   const { name, email, password } = req.body;
//   const sql =
//     "INSERT INTO userlogin (USER_NAME, EMAIL_ID, PASS_WD) VALUES (?, ?, ?)";
//   const hashedPassword = bcrypt.hashSync(password, 8);

//   const checkuser = "SELECT COUNT(*) FROM userlogin WHERE `EMAIL_ID`= ? ";
//   var result = pool.query(checkuser, [email]);

//   if (result > 0) {
//     alert("Email already exists");
//   } else {
//     pool.query(sql, [name, email, hashedPassword], (err, data) => {
//       if (err) {
//         return res.json(err);
//       } else {
//         return res.json(data);
//       }
//     });
//   }
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   const sql = "SELECT * FROM userlogin WHERE `EMAIL_ID`=?";

//   pool.query(sql, [email], (err, data) => {
//     if (err) {
//       return res.json(err);
//     }
//     if (data.length > 0) {
//       const hashedPassword = data[0].PASS_WD;
//       bcrypt.compare(password, hashedPassword, (compareErr, match) => {
//         if (compareErr) {
//           return res.json(compareErr);
//         }
//         if (match) {
//           return res.json("success");
//         } else {
//           return res.json("fail");
//         }
//       });
//     } else {
//       return res.json("fail");
//     }
//   });
// });

// app.listen(9000, () => {
//   console.log("Server is running on port 9000");
// });

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
      const hashedPassword = data[0].PASS_WD;
      bcrypt.compare(password, hashedPassword, (compareErr, match) => {
        if (compareErr) {
          return res.status(500).json({ error: "Internal server error" });
        }
        if (match) {
          return res.status(200).json("success");
          // return res.json("success");
        } else {
          return res.status(401).json({ error: "Invalid credentials" });
        }
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Start server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
