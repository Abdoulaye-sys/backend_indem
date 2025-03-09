const { Pool } = require('pg');

if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_PASS || !process.env.DB_PORT) {
    console.error('❌ Une ou plusieurs variables d\'environnement sont manquantes !');
    process.exit(1);
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 5432,
    ssl: {
        rejectUnauthorized: false,  // Accepte les connexions SSL sans vérifier le certificat
    }
});

module.exports = pool;
