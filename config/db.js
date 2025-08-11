const mongoose = require('mongoose')

const connectdb = async () =>{
    try{
        const uri = process.env.MONGODB_URI;
        console.log('URI de connexion:', uri)
        await mongoose.connect(uri,{
             useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log('✅✅😀 Mongo bien connecté....!');
    
    }
     catch(error){
        console.error(`❌❌😔 Erreur de connexion....! , ${error.message}`)
        process.exit(1)

     }
};
module.exports = connectdb;
