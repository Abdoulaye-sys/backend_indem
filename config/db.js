const { Pool } = require('pg');

// Vérifie si toutes les variables d'environnement nécessaires sont définies
if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_PASS || !process.env.DB_PORT) {
    console.error('❌ Une ou plusieurs variables d\'environnement sont manquantes !');
    process.exit(1);  // Arrête l'application si les variables ne sont pas définies
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 5432,  // Utilise 5432 par défaut si DB_PORT n'est pas défini
});

module.exports = pool;
