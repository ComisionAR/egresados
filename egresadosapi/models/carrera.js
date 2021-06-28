const mongoose= require('mongoose');

const CarrerasSchema = new mongoose.Schema({
    codigo:{
        type:String, 
        require:true, 
        trim: true
    },
    nombre:{
        type:String, 
        require:true, 
        trim: true
    },
    estado: {
        type:String, 
        require:true, 
        trim: true
    }
})

module.exports = mongoose.model('carreras', CarrerasSchema); 