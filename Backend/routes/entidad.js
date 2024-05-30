const express = require('express');
const { verifyToken } = require('../middleware/authJwt');
const router = express.Router();
const db = require('../db');

// Obtener todas las entidades
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tb_entidad');
    const entidades = rows.map(row => ({
      ...row,
      estado: row.estado[0] === 1 // Convertir el buffer a booleano
    }));
    res.json(entidades);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching entidades');
  }
});

// Crear una nueva entidad
router.post('/', verifyToken, async (req, res) => {
  const { id_tipo_documento, nro_documento, razon_social, nombre_comercial, id_tipo_contribuyente, direccion, telefono, estado } = req.body;
  try {
    const result = await db.query('INSERT INTO tb_entidad (id_tipo_documento, nro_documento, razon_social, nombre_comercial, id_tipo_contribuyente, direccion, telefono, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id_tipo_documento, nro_documento, razon_social, nombre_comercial, id_tipo_contribuyente, direccion, telefono, estado]);
    res.status(201).json({ message: 'Entidad creada exitosamente' });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      res.status(400).json({ message: 'Error: El tipo de documento no existe' });
    } else {
      res.status(500).json({ message: 'Error al crear la entidad' });
    }
  }
});

// Actualizar una entidad existente
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { id_tipo_documento, nro_documento, razon_social, nombre_comercial, id_tipo_contribuyente, direccion, telefono, estado } = req.body;
  try {
    const result = await db.query('UPDATE tb_entidad SET id_tipo_documento = ?, nro_documento = ?, razon_social = ?, nombre_comercial = ?, id_tipo_contribuyente = ?, direccion = ?, telefono = ?, estado = ? WHERE id_entidad = ?', [id_tipo_documento, nro_documento, razon_social, nombre_comercial, id_tipo_contribuyente, direccion, telefono, estado, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Entidad no encontrada' });
    }
    res.status(200).json({ message: 'Entidad actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la entidad' });
  }
});

// Eliminar una entidad
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM tb_entidad WHERE id_entidad = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Entidad no encontrada' });
    }
    res.status(200).json({ message: 'Entidad eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la entidad' });
  }
});

module.exports = router;
