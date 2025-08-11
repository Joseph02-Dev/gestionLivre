const mongoose = require('mongoose');
const utilisateurSchema = new mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match:[/^\S+@\S+\.\S+$/, 'Email non valide...!']
    },
    motDePasse:{
        type: String,
        required: true,
        minlength: 6
    }
    // timestamps:true
})

module.exports = mongoose.model('Utilisateurs', utilisateurSchema)