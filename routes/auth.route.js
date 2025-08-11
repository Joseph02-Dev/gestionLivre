const express = require('express');
const router = express.Router();
const lien = require('../controllers/utilisateur.controller');

// POST /api/auth/register
router.post('/inscription',lien.inscription);

// POST /api/auth/login
router.post('/connexion',lien.connexion);

module.exports = router;

