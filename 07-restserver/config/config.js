// ==============
//  PORT
// ==============
process.env.PORT = process.env.PORT || 8000;

// ==============
//  JWT
// ==============
process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';
process.env.JWT_SEED = process.env.JWT_SEED || 'seedsecret-development-nodecurse';

// ==============
//  MONGO
// ==============
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/cursonode';

// ==============
//  GOOGLE
// ==============
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '214146994863-imv81skf38nebs1mfmsgrvunrr0h4kdb.apps.googleusercontent.com';
