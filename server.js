const { error } = require("console");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = 8080;

app.use(express.json());

const users = [
  {
    name: "Bat",
    id: 1,
  },
  {
    name: "Bold",
    id: 2,
  },
  {
    name: "Suhee",
    id: 3,
  },
];

app.get("/users", (req, res) => {
  const authToken = req.headers.authorization;
  jwt.verify(authToken, "taf", (err) => {
    if (err) {
      res.send("invalid token");
    }
  });
  if (authToken) {
    res.send(users);
  } else {
    res.send("not authenticated");
  }
});
app.post("/login", (req, res) => {
  const body = req.body;
  const jwtToken = jwt.sign(body, "taf");
  res.send(jwtToken);
});

app.listen(PORT);
