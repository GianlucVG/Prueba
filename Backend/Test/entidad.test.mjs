import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { expect } from 'chai';
import entidadRoutes from '../routes/entidad.js'; // Asegúrate de que este archivo existe
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
app.use('/api/entidad', entidadRoutes);

describe('Entidad API', () => {
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

  it('should get all entidades', async () => {
    const res = await request(app)
      .get('/api/entidad')
      .set('x-access-token', token);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should create a new entidad', async () => {
    const newEntidad = {
      id_tipo_documento: 3,
      nro_documento: 'unique123456', // Asegúrate de que este número sea único
      razon_social: 'Test Entidad',
      nombre_comercial: 'Test Comercial',
      id_tipo_contribuyente: 1,
      direccion: 'Test Address',
      telefono: '123456789',
      estado: true
    };
    const res = await request(app)
      .post('/api/entidad')
      .set('x-access-token', token)
      .send(newEntidad);
    expect(res.statusCode).to.equal(201);
  });  

  it('should delete an entidad', async () => {
    const res = await request(app)
      .delete('/api/entidad/64')
      .set('x-access-token', token);
    expect(res.statusCode).to.equal(200);
  });
});
