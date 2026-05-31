const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "Name is required";
  }

  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!password || password.trim() === "") {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  return res.json({ success: true, message: "User registered successfully" });
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});