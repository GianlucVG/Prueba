import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { expect } from 'chai';
import tipoContribuyenteRoutes from '../routes/tipoContribuyente.js';
import authRoutes from '../routes/auth.js';

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

app.use('/api/auth', authRoutes);
app.use('/api/tipoContribuyente', tipoContribuyenteRoutes);

describe('TipoContribuyente API', () => {
  let token;

  before(async () => {
    // Obtener un token válido
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      });
    token = res.body.token;
  });

  it('should get all tipoContribuyentes', async () => {
    const res = await request(app)
      .get('/api/tipoContribuyente')
      .set('x-access-token', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should create a new tipoContribuyente', async () => {
    const newTipoContribuyente = {
      nombre: 'Test Contribuyente',
      estado: true
    };
    const res = await request(app)
      .post('/api/tipoContribuyente')
      .set('x-access-token', token)
      .send(newTipoContribuyente);
    expect(res.statusCode).to.equal(201);
  });

  it('should update a tipoContribuyente', async () => {
    const updatedTipoContribuyente = {
      nombre: 'Updated Contribuyente',
      estado: true
    };
    const res = await request(app)
      .put('/api/tipoContribuyente/1')
      .set('x-access-token', token)
      .send(updatedTipoContribuyente);
    expect(res.statusCode).to.equal(200);
  });
  it('should delete an tipoContribuyente', async () => {
    const res = await request(app)
      .delete('/api/tipoContribuyente/34')
      .set('x-access-token', token);
    expect(res.statusCode).to.equal(200);
  });
});
