const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

module.exports = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  process.env.MONGODB_URI = mongoUri;
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret-key-for-jwt-tokens';
  process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key';
  process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';
  
  console.log('✓ MongoMemoryServer iniciado en:', mongoUri);
  
  // Almacena el server en global para poder cerrarlo después
  global.__MONGO_SERVER__ = mongoServer;
};
