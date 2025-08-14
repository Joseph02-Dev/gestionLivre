require('dotenv').config();
const express = require('express')
const connectdb = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth.route');
const livreRoutes = require('./routes/livre.route');

const app = express()

connectdb();

//les midddlewares
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

// Les routes


app.use('/api/auth', authRoutes);
app.use('/api/livre', livreRoutes);


app.listen(process.env.PORT, () => {
    console.log(`♨️ ♨️  Server lancé sur le port ${process.env.PORT}`)}  
)