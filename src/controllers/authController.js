const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { registerSchema } = require("../utils/validate");

exports.register = (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const hashed = bcrypt.hashSync(req.body.password, 10);

  db.run(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    [req.body.email, hashed, req.body.role],
    (err) => {
      if (err) return res.status(400).json({ message: "User exists" });
      res.json({ message: "Registered successfully" });
    }
  );
};

exports.login = (req, res) => {
  db.get(
    "SELECT * FROM users WHERE email = ?",
    [req.body.email],
    (err, user) => {
      if (!user || !bcrypt.compareSync(req.body.password, user.password))
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token });
    }
  );
};
