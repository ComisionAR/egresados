const mongoose = require("mongoose");

const UsuariosSchema= mongoose.Schema({
    nombre: {
        type: String,
        required:  true,
        trim: true
    },
    cedula: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }, 
    apellido:{
        type: String,
        required:  true,
        trim: true
    },
    provincia: {
        type: String,
        required:  true,
        trim: true,
    },
    canton: {
        type: String,
        required: true,
        trim: true
    },
    distrito:{
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: false,
        trim: true
    },
    telefonos: {
        type: Array,
        required: true,     
    },
    fecha_nacimiento: {
        type: String,
        required: true,
        trim: true
    },
    perfil: {
        type: String,
        trim: true
    },
    foto:{
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: Array,
        required:  true,
    },
    clave: {
        type: String,
        required:  true,
        trim: true,
    },
    estado: {
        type: String,
        required:  true,
        trim: true       
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Usuario",UsuariosSchema)


    
    
 