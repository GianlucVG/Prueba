const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post('/register', 
  body('email').isEmail(), 
  body('password').isLength({ min: 6 }), 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
      const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
      console.log('Executing query:', query, [email, hashedPassword]);
      const [results] = await db.query(query, [email, hashedPassword]);
      console.log('Query results:', results);
      res.status(200).json({ message: 'User registered successfully!' });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Error on the server.' });
    }
});

router.post('/login', 
  body('email').isEmail(), 
  body('password').exists(), 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const query = `SELECT * FROM users WHERE email = ?`;
      console.log('Executing query:', query, [email]);
      const [results] = await db.query(query, [email]);
      if (results.length === 0) return res.status(404).json({ error: 'No user found.' });

      const passwordIsValid = bcrypt.compareSync(password, results[0].password);
      if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).json({ auth: true, token });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Error on the server.' });
    }
});

module.exports = router;