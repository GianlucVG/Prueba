const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./db');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const entidadRoutes = require('./routes/entidad');
const tipoContribuyenteRoutes = require('./routes/tipoContribuyente');
const tipoDocumentoRoutes = require('./routes/tipoDocumento');

app.use('/api/auth', authRoutes);
app.use('/api/entidad', entidadRoutes); 
app.use('/api/tipoContribuyente', tipoContribuyenteRoutes);
app.use('/api/tipoDocumento', tipoDocumentoRoutes); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
