const express = require('express');
const router = express.Router();
const liens = require('../controllers/livre.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// Créer un livre
router.post('/publier', authMiddleware, liens.creationNouveauLivre);

// Lire tous les livres
router.get('/voir', liens.voirLivre);

// Mettre à jour un livre
router.put('/voir:id', authMiddleware, liens.mettreAJourLivre);

// Supprimer un livre
router.delete('/:id', authMiddleware, liens.supprimerLivre);

module.exports = router;