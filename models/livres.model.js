const mongoose = require('mongoose')

const livreSchema = new mongoose.Schema({
    titre:{
        type: String,
        required: true,
        trim: true
    },
    auteur:{
        type: String,
        required: true,
        trim: true
    },
    resume:{
        type: String,
        default: ''
    },
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    }
})
module.exports = mongoose.model('Livres', livreSchema);