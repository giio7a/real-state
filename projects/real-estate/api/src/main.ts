import express from 'express';
import * as path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env['PORT'] || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Real Estate' });
});

// Iniciar el servidor
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

export default server;