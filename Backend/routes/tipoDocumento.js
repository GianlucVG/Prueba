const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// Middleware de autenticación
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
};

// Obtener todos los tipos de documento
router.get('/', verifyToken, async (req, res) => {
  try {
    const query = 'SELECT * FROM tb_tipo_documento';
    const [results] = await db.query(query);
    // Convertir el estado de buffer a número
    const formattedResults = results.map(documento => ({
      ...documento,
      estado: documento.estado.readUInt8(0) // Convertir buffer a número
    }));
    console.log(formattedResults); // Verificar los datos formateados
    res.status(200).json(formattedResults);
  } catch (err) {
    res.status(500).send('Error on the server.');
  }
});

// Insertar un nuevo tipo de documento
router.post('/', verifyToken, async (req, res) => {
  const { codigo, nombre, descripcion, estado } = req.body;
  try {
    const query = 'INSERT INTO tb_tipo_documento (codigo, nombre, descripcion, estado) VALUES (?, ?, ?, ?)';
    await db.query(query, [codigo, nombre, descripcion, estado]);
    res.status(201).send('Tipo de documento creado exitosamente');
  } catch (err) {
    res.status(500).send(`Error en el servidor: ${err.sqlMessage}`);
  }
});

// Actualizar un tipo de documento
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre, descripcion, estado } = req.body;

  try {
    const query = 'UPDATE tb_tipo_documento SET codigo = ?, nombre = ?, descripcion = ?, estado = ? WHERE id_tipo_documento = ?';
    const [results] = await db.query(query, [codigo, nombre, descripcion, estado, id]);
    res.status(200).json({ message: 'Tipo de documento actualizado exitosamente' });
  } catch (err) {
    res.status(500).send('Error on the server.');
  }
});

// Eliminar un tipo de documento
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM tb_tipo_documento WHERE id_tipo_documento = ?';
    const [results] = await db.query(query, [id]);
    res.status(200).json({ message: 'Tipo de documento eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


module.exports = router;
