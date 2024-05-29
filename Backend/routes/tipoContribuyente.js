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

// Obtener todos los tipos de contribuyente
router.get('/', verifyToken, async (req, res) => {
  try {
    const query = 'SELECT * FROM tb_tipo_contribuyente';
    const [results] = await db.query(query);
    const formattedResults = results.map(contribuyente => ({
      ...contribuyente,
      estado: contribuyente.estado.readUInt8(0) // Convertir buffer a número
    }));
    console.log(formattedResults); // Verificar los datos formateados
    res.status(200).json(formattedResults);
  } catch (err) {
    res.status(500).send('Error on the server.');
  }
});

// Insertar un nuevo tipo de contribuyente
router.post('/', verifyToken, async (req, res) => {
  const { nombre, estado } = req.body;
  try {
    const query = 'INSERT INTO tb_tipo_contribuyente (nombre, estado) VALUES (?, ?)';
    await db.query(query, [nombre, estado]);
    res.status(201).send('Tipo de contribuyente creado exitosamente');
  } catch (err) {
    res.status(500).send(`Error en el servidor: ${err.sqlMessage}`);
  }
});

// Actualizar un tipo de contribuyente
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;

  try {
    const query = 'UPDATE tb_tipo_contribuyente SET nombre = ?, estado = ? WHERE id_tipo_contribuyente = ?';
    const [results] = await db.query(query, [nombre, estado, id]);
    res.status(200).json({ message: 'Tipo de contribuyente actualizado exitosamente' });
  } catch (err) {
    res.status(500).send('Error on the server.');
  }
});

// Eliminar un tipo de contribuyente
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM tb_tipo_contribuyente WHERE id_tipo_contribuyente = ?';
    const [results] = await db.query(query, [id]);
    res.status(200).send('Tipo de contribuyente eliminado exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error on the server.');
  }
});


module.exports = router;
