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
    const [results] = await db.query('SELECT * FROM tb_tipo_contribuyente');
    const formattedResults = results.map(contribuyente => ({
      ...contribuyente,
      estado: contribuyente.estado.readUInt8(0)
    }));
    res.status(200).json(formattedResults);
  } catch (err) {
    res.status(500).send('Error on the server.');
  }
});

router.post('/', verifyToken, async (req, res) => {
  const { nombre, estado } = req.body;
  try {
    await db.query('INSERT INTO tb_tipo_contribuyente (nombre, estado) VALUES (?, ?)', [nombre, estado]);
    res.status(201).json({ message: 'Tipo de contribuyente creado exitosamente' });
  } catch (err) {
    res.status(500).send('Error on the server.');
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;
  try {
    await db.query('UPDATE tb_tipo_contribuyente SET nombre = ?, estado = ? WHERE id_tipo_contribuyente = ?', [nombre, estado, id]);
    res.status(200).json({ message: 'Tipo de contribuyente actualizado exitosamente' });
  } catch (err) {
    res.status(500).send('Error on the server.');
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM tb_tipo_contribuyente WHERE id_tipo_contribuyente = ?', [id]);
    res.status(200).json({ message: 'Tipo de contribuyente eliminado exitosamente' });
  } catch (err) {
    res.status(500).send('Error on the server.');
  }
});

module.exports = router;
