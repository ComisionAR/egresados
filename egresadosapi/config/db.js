const mongoose = require("mongoose");

require("dotenv").config({path: "variables.env"});

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("Base de datos conectada correctamente")
    } catch (error) {
        console.log("Error en la conexion");
        console.log(error);   
        process.exit(1); 
    }
}

module.exports = conectarDB;