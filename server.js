const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");

// Importer les routes
const indemRoutes = require("./routes/indemRoutes");
const paiementRoutes = require("./routes/paiementRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Utiliser le port défini par Render (ou le port local pour les tests)
const PORT = process.env.PORT || 5000;

// ✅ Vérifier la connexion à PostgreSQL
pool.connect()
    .then(() => console.log("✅ Connecté à la base de données PostgreSQL"))
    .catch(err => console.error("❌ Erreur de connexion à PostgreSQL :", err));

// ✅ Middleware
app.use(express.json());  // Parse les requêtes JSON
app.use(cors({
    origin: 'https://mellow-horse-a612b1.netlify.app/',  // Remplace par l'URL de ton frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

// ✅ Routes
app.use("/api/indemnisations", indemRoutes);
app.use("/api/paiements", paiementRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);  // La route d'authentification

// ✅ Route de test
app.get("/", (req, res) => {
    res.send("API is running...");
});

// ✅ Démarrage du serveur avec le port approprié
app.listen(PORT, () => {
    console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});
