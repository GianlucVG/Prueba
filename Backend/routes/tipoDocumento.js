const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
};

router.get('/', verifyToken, async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM tb_tipo_documento');
    const formattedResults = results.map(documento => ({
      ...documento,
      estado: documento.estado.readUInt8(0)
    }));
    res.status(200).json(formattedResults);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching tipos de documento');
  }
});

router.post('/', verifyToken, async (req, res) => {
  const { codigo, nombre, descripcion, estado } = req.body;
  try {
    await db.query('INSERT INTO tb_tipo_documento (codigo, nombre, descripcion, estado) VALUES (?, ?, ?, ?)', [codigo, nombre, descripcion, estado]);
    res.status(201).json({ message: 'Tipo de documento creado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear el tipo de documento' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre, descripcion, estado } = req.body;
  try {
    await db.query('UPDATE tb_tipo_documento SET codigo = ?, nombre = ?, descripcion = ?, estado = ? WHERE id_tipo_documento = ?', [codigo, nombre, descripcion, estado, id]);
    res.status(200).json({ message: 'Tipo de documento actualizado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar el tipo de documento' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM tb_tipo_documento WHERE id_tipo_documento = ?', [id]);
    res.status(200).json({ message: 'Tipo de documento eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar el tipo de documento' });
  }
});

module.exports = router;
