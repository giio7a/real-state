//archivo de configuración de la base de datos
require('dotenv').config();

module.exports = {
    //configuración de la base de datos en desarrollo
  development: { 
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '23102608',
    database: process.env.DB_NAME || 'real_estate_db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    define: {
      timestamps: true,
      underscored: true
    }
  },
  //configuración de la base de datos en pruebas
  test: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '23102608',
    database: process.env.DB_NAME || 'real_estate_test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    define: {
      timestamps: true,
      underscored: true
    }
  },
  //configuración de la base de datos en producción
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      timestamps: true,
      underscored: true
    }
  }
};