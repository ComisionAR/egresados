const mongoose = require("mongoose");

const EgresadoSchema = mongoose.Schema({
    cedula: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    telefonoPersonal: {
        type: String,
        required: true,      
    },
    fecha_Nacimiento: {
        type: String,
        required: true,
        trim: true
    },
    annioIngreso: {
        type: String,
        required: true,
        trim: true
    },
    annioEgreso: {
        type: String,
        required: true,
        trim: true
    },
    carrera:{
        type: String,
        require:true,
        trim: true
    },
    telefonoTrabajo: {
        type: String,
        required: false,
    },
    labora: {
        type: String,
        required: true,
        trim: true
    },
    trabajoActual: {
        type: String,
        required: false,
        trim: true
    },
    correoUNA: {
        type: String,
        required: true,
        trim: true,
     
    },
    correoPersonal: {
        type: String,
        required:  true,
     
    },
    correoTrabajo:{
        type: String,
        required: false,
        trim: true,
     
    }
    ,
    direccion:{
        type: String,
        required: false,
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
})

module.exports = mongoose.model("egresados", EgresadoSchema);
