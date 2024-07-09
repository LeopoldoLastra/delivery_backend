require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 4000,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT
};

module.exports= {config}
