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

app.post("/logout", (req, res) => {
  res.cookie('token','').json(true);
})

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  });
}
// Endpoint to get all visited places for the authenticated user
app.get("/visited-places", verifyToken, (req, res) => {
  const sql = "SELECT * FROM visited_places WHERE user_email = ?";
  pool.query(sql, [req.user.email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

// Endpoint to add a visited place
app.post("/visited-places", verifyToken, (req, res) => {
  const { name, description, imageLink, review } = req.body;
  const sql =
    "INSERT INTO visited_places (user_email, name, description, image_link, review) VALUES (?, ?, ?, ?, ?)";
  pool.query(
    sql,
    [req.user.email, name, description, imageLink, review],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({
        id: results.insertId,
        user_email: req.user.email,
        name,
        description,
        image_link: imageLink,
        review,
      });
    }
  );
});

// Endpoint to get details of a specific visited place
app.get("/visited-places/:id", verifyToken, (req, res) => {
  const sql = "SELECT * FROM visited_places WHERE id = ? AND user_email = ?";
  pool.query(sql, [req.params.id, req.user.email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.status(200).json(results[0]);
  });
});

// Endpoint to delete a visited place
app.delete("/visited-places/:id", verifyToken, (req, res) => {
  const sql = "DELETE FROM visited_places WHERE id = ? AND user_email = ?";
  pool.query(sql, [req.params.id, req.user.email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.status(200).json({ message: "Place deleted successfully" });
  });
});


// Start server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

// const app = express();
// const jwtSecret = "indvkrsmsnnjsskarmys"; // Replace with your actual JWT secret

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173", // Update with your frontend URL
//   })
// );

// // Create MySQL connection pool
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "nagesh2003", // Replace with your MySQL password
//   database: "travelbuddy",
// });

// // Middleware to verify JWT token
// function verifyToken(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   jwt.verify(token, jwtSecret, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     req.user = decoded;
//     next();
//   });
// }

// // Endpoint to add a new visited place
// app.post("/visited-places", verifyToken, (req, res) => {
//   const { name, description, image_link, review } = req.body;
//   const user_email = req.user.email; // Assuming email is unique identifier

//   const sql =
//     "INSERT INTO visited_places (user_email, name, description, image_link, review) VALUES (?, ?, ?, ?, ?)";
//   pool.query(
//     sql,
//     [user_email, name, description, image_link, review],
//     (err, results) => {
//       if (err) {
//         console.error("Error adding visited place:", err);
//         return res.status(500).json({ error: "Internal server error" });
//       }
//       const insertedId = results.insertId;
//       res.status(201).json({ id: insertedId });
//     }
//   );
// });

// // Endpoint to fetch all visited places for a user
// app.get("/visited-places", verifyToken, (req, res) => {
//   const user_email = req.user.email; // Assuming email is unique identifier

//   const sql = "SELECT * FROM visited_places WHERE user_email = ?";
//   pool.query(sql, [user_email], (err, results) => {
//     if (err) {
//       console.error("Error fetching visited places:", err);
//       return res.status(500).json({ error: "Internal server error" });
//     }
//     res.json(results);
//   });
// });

// // Start server
// const PORT = 9000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
