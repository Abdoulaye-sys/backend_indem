const express = require("express");
const cors = require("cors");
require("dotenv").config();
const indemRoutes = require("./routes/indemRoutes");
const paiementRoutes = require("./routes/paiementRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const pool = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware"); // ✅ Ajout du middleware

// ✅ Vérifier la connexion à PostgreSQL
pool.connect()
    .then(() => console.log("✅ Connecté à la base de données PostgreSQL"))
    .catch(err => console.error("❌ Erreur de connexion à PostgreSQL :", err));

// ✅ Middleware
app.use(express.json()); 
app.use(cors());

// ✅ Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/indemnisations", indemRoutes);
app.use("/api/paiements", paiementRoutes);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


// ✅ Route de test
app.get("/", (req, res) => {
    res.send("API is running...");
});

// ✅ Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur en ligne sur http://localhost:${PORT}`);
});
