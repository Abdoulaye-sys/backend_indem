const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  console.log("🔍 Headers reçus :", req.headers); // Vérification des headers

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Accès non autorisé, token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    decoded.email = decoded.email.trim(); // Enlever les espaces inutiles de l'email
    console.log("✅ Token décodé :", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Erreur d'authentification :", error.message);
    res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

module.exports = authMiddleware;
