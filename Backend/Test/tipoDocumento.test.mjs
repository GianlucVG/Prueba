import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { expect } from 'chai';
import tipoDocumentoRoutes from '../routes/tipoDocumento.js';
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
app.use('/api/tipoDocumento', tipoDocumentoRoutes);

describe('TipoDocumento API', () => {
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

  it('should get all tipoDocumentos', async () => {
    const res = await request(app)
      .get('/api/tipoDocumento')
      .set('x-access-token', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should create a new tipoDocumento', async () => {
    const newTipoDocumento = {
      codigo: '9999', // Cambiar a un valor único
      nombre: 'Test Documento',
      descripcion: 'Test Descripcion',
      estado: true
    };
    const res = await request(app)
      .post('/api/tipoDocumento')
      .set('x-access-token', token)
      .send(newTipoDocumento);
    expect(res.statusCode).to.equal(201);
  });

  it('should update a tipoDocumento', async () => {
    const updatedTipoDocumento = {
      codigo: '99',
      nombre: 'Updated Documento',
      descripcion: 'Updated Descripcion',
      estado: true
    };
    const res = await request(app)
      .put('/api/tipoDocumento/1')
      .set('x-access-token', token)
      .send(updatedTipoDocumento);
    expect(res.statusCode).to.equal(200);
  });

  it('should delete a tipoDocumento', async () => {
    const res = await request(app)
      .delete('/api/tipoDocumento/1')
      .set('x-access-token', token);
    expect(res.statusCode).to.equal(200);
  });
});
