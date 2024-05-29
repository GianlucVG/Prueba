// auth.test.mjs
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { expect } from 'chai';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const getConnection = async () => {
  return mysql.createConnection(dbConfig);
};

const authRoutes = express.Router();

authRoutes.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const connection = await getConnection();
    await connection.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    connection.end();
    res.status(200).send('User registered successfully!');
  } catch (err) {
    res.status(500).send('There was a problem registering the user.');
  }
});

authRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await getConnection();
    const [results] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    connection.end();

    if (results.length === 0) {
      return res.status(404).send('No user found.');
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  } catch (err) {
    res.status(500).send('Error on the server.');
  }
});

app.use('/api/auth', authRoutes);

describe('Auth API', () => {
  before(async () => {
    const connection = await getConnection();
    await connection.execute('DELETE FROM users WHERE email = ?', ['test@example.com']);
    connection.end();
  });

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password'
      });
    expect(res.statusCode).to.equal(200);
    expect(res.text).to.equal('User registered successfully!');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('auth', true);
    expect(res.body).to.have.property('token');
  });
});
