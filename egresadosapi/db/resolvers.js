const Usuario = require("../models/Usuario")
const Carrera = require("../models/carrera");
const bcryptjs = require("bcryptjs");
require("dotenv").config({path: "variables.env"});
const jsonWebToken = require("jsonwebtoken");

const Egresado = require("../models/Egresado");
var randomize = require('randomatic');
var nodemailer = require('nodemailer');
crearToken = (usuario, key, expiresIn) =>{

    const {id, cedula, nombre, apellido,provincia,canton, distrito, direccion, fecha_nacimiento, email, telefonos} = usuario;
    return jsonWebToken.sign( {id, cedula, nombre, apellido,provincia,canton, distrito, direccion, fecha_nacimiento, email, telefonos} ,key, {expiresIn});
}


const resolvers = {
    Query:{
        obtenerUsuario: async(_, {}, ctx ) =>{
            console.log(ctx.usuario)
            return ctx.usuario;    
        },
        obtenerUsuarioId:async (_,{id},ctx) => {
            
            const usuario = await Usuario.findById(id);

            if(!usuario){
                throw new Error("Usuario no encontrado");
            }
            return usuario;
        }
        ,
        obtenerUsuarios: async (_, {estado} , ctx)=>{
            try{
         
                    const usuario = await Usuario.find({estado})
                    return usuario;
              
              
            }catch(error){
                console.log(error);
            }

        },
        obtenerCarreras: async (_,{estado})=>{
            try {
                const carrera = await Carrera.find({estado});
                return carrera;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerCarreraId:async(_,{id}) =>{
            const carrera = await Carrera.findById(id);

            if(!carrera){
                throw new Error("Carrera no encontrada");
            }
            return carrera;
        },
        obtenerEgresados: async (_, { estado}, ctx)=>{

  
            try {
        
                   
                const egresados = await Egresado.find({estado});
                return egresados;





            } catch (error) {
                console.log(error)
            } 
        },
        obtenerEgresadoId: async (_, {id} )=>{
            const egresado = await Egresado.findById(id);

            if(!egresado){
                throw new Error("Egresado no encontrado");
            }
            return egresado;
        }

    },
    Mutation: {
        crearUsuario: async (_, { input} ) => {
            const {cedula , clave} = input;
            const sinGuion = cedula.replace(/-/g, "");
            //si viene sin guion pasarlo con guion
            const conGuion1 = cedula.substr(0, 1);
            const conGuion2 = cedula.substr(1, 4);
            const conGuion3 = cedula.substr(5, 7);
            const conGuion = conGuion1 + "-" + conGuion2 + "-" + conGuion3;





            //Validar si el usuario existe
            const existeUsuario = await Usuario.findOne({
                $or: [{ cedula: cedula }, { cedula: sinGuion }, { cedula: conGuion }],
                estado:'ACTIVO'
              });

              
            if(existeUsuario){
                throw new Error("El usuario ya esta existe");
            }
            
            //Hashear la contraseña
            const salt = await bcryptjs.genSaltSync(10);
            input.clave = await bcryptjs.hash(clave, salt);

            //Guardar en la base de datos
            try{
                const usuario = new Usuario(input);
                await usuario.save();
                return usuario;
            }catch(error){
                console.log(error)
            }
        },
        autenticarUsuario: async (_, {input}) =>{
            const {cedula, clave} = input;

            const sinGuion = cedula.replace(/-/g, "");
            //si viene sin guion pasarlo con guion
            const conGuion1 = cedula.substr(0, 1);
            const conGuion2 = cedula.substr(1, 4);
            const conGuion3 = cedula.substr(5, 7);
            const conGuion = conGuion1 + "-" + conGuion2 + "-" + conGuion3;





            //Validar si el usuario existe
            const existeUsuario = await Usuario.findOne({
                $or: [{ cedula: cedula }, { cedula: sinGuion }, { cedula: conGuion }],
                estado:'ACTIVO'
              });
            if(!existeUsuario){
                throw new Error("El usuario no existe");
            }

            //Validar si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(clave, existeUsuario.clave);
            if(!passwordCorrecto){
                throw new Error("La clave es incorrecta");
            }

            //Crear el respectivo token
            return{
                token: crearToken(existeUsuario, process.env.secretKey, "1hr"),
            };
        },
        actualizarPassword: async (root, { id, actual, nueva }) => {
            const usuario = await Usuario.findOne({ _id: id });
      
            const claveCorrecto = await bcryptjs.compare(actual, usuario.clave);
      
            if (!claveCorrecto) {
              return "";
            }
      
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(nueva, salt);
      
            const actualizar = await Usuario.findOneAndUpdate(
              { _id: id },
              { clave: hash }
            );
            if (actualizar) {
              return "Contraseña cambiada correctamente.";
            }
          },
          nuevaContrasenna: async (root, { cedula}) => {
            const sinGuion = cedula.replace(/-/g, "");
            //si viene sin guion pasarlo con guion
            const conGuion1 = cedula.substr(0, 1);
            const conGuion2 = cedula.substr(1, 4);
            const conGuion3 = cedula.substr(5, 7);
            const conGuion = conGuion1 + "-" + conGuion2 + "-" + conGuion3;





            //Validar si el usuario existe
            const usuario = await Usuario.findOne({
                $or: [{ cedula: cedula }, { cedula: sinGuion }, { cedula: conGuion }],
                estado:'ACTIVO'
              });
      
          
            if (!usuario) {
              return "";
            }else
            {
             const nueva = randomize('*', 10);

            
             var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'arcomision018@gmail.com',
                  pass: 'comision1234.'
                }
              });
              
              var mailOptions = {
                from: 'arcomision018@gmail.com',
                to: usuario.email[0].email,
                subject: 'Nueva contraseña',
                text: 'Su contraseña de acceso es: ' + nueva
              };
              const salt = await bcryptjs.genSalt(10);
              const hash = await bcryptjs.hash(nueva, salt);
        
              const actualizar = await Usuario.findOneAndUpdate(
                { _id: usuario.id},
                { clave: hash }
              );
                  
  

              transporter.sendMail(mailOptions, async function(error, info){
                console.log('Email sent: ' + info.response);
         
              });
              
  
  
              if (actualizar) {
                return "Contraseña cambiada correctamente.";
              }else{
                  return ""
              }






           
            }
      
            
          },
        actualizarUsuario: async (_, { id,input }) =>{
            //Validar que el usuario exista
            let usuario = await Usuario.findById(id);
            if(!usuario){
                throw new Error("El usuario no existe");
            }
            
            //Guardar en la base de datos
            usuario = await Usuario.findOneAndUpdate({_id: id}, input, {
                new: true,
            });
            return usuario;
            
        },

        desactivarUsuario: async (_, {id}) =>{
             //Validar que el usuario exista
             let usuario = await Usuario.findById(id);
             if(!usuario){
                 throw new Error("El usuario no existe");
             }
             console.log('here')
             //Desactivar el usuario
             usuario = await Usuario.findOneAndUpdate({_id: id},{estado: "INACTIVO"}, {
                new: true,
            });
            return 'Usuario eliminado correctamente';
        },

        insertarCarrera: async (_, {input}) =>{
            const {codigo} = input;
            //Validar si la carrera existe
            const existeCarrera = await Carrera.findOne({ codigo });
            if(existeCarrera){
                throw new Error("La carrera ya esta existe");
            }

            //Guardar en la base de datos
            try {
                const carrera = new Carrera(input);
                carrera.save();
                return carrera;
            } catch (error) {
                console.log(error)
            }

        },
       
        actualizarCarrera: async(_, {id, input, codigo}) =>{
            //Validar que la carrera exista
            const nuevoCod = input.codigo;
            let carrera = await Carrera.findOne({codigo: nuevoCod});
            if(!carrera){
                throw new Error("La carrea no existe");
            }

            //Validar actualizar la carrera con un codigo de otra
            if(carrera && codigo != carrera.codigo){
                throw new Error("Ya existe una carrrera con el mismo código");
            }

            //Guardar en la base de datos
            const carrera_ = await Carrera.findOneAndUpdate({_id: id}, input,{
                new: true,
            });
            return carrera;

        },

        desactivarCarrera: async(_, { id }) => {
            //Validar que la carrera exista
            let carrera = await Carrera.findById(id);
            if(!carrera){
                throw new Error("La carrera no existe");
            }
            
            //Desactivar Carrera
            carrera = await Carrera.findOneAndUpdate({_id: id}, {estado: "INACTIVO"}, {
                new: true,
            })

            return carrera;
        },
        insertarEgresado: async(_, { input })=>{
            const {cedula} = input;
            const sinGuion = cedula.replace(/-/g, "");
            //si viene sin guion pasarlo con guion
            const conGuion1 = cedula.substr(0, 1);
            const conGuion2 = cedula.substr(1, 4);
            const conGuion3 = cedula.substr(5, 7);
            const conGuion = conGuion1 + "-" + conGuion2 + "-" + conGuion3;





            //Validar si el usuario existe
            const existeEgresado = await Egresado.findOne({
                $or: [{ cedula: cedula }, { cedula: sinGuion }, { cedula: conGuion }],
                estado:'ACTIVO'
              });

            if(existeEgresado){
                throw new Error("El egresado ya existe");
            }
            try {
                const egresado = new Egresado(input);
                await egresado.save();
                return egresado;   
            } catch (error) {
                console.log(error)
            }
        },

        insertarCargaExcel: async (_, { input })=> {
            const data = [];
  
            for await (const nuevaCarga of input.data) {
                const {cedula} = nuevaCarga;
                const sinGuion = cedula.replace(/-/g, "");
                //si viene sin guion pasarlo con guion
                const conGuion1 = cedula.substr(0, 1);
                const conGuion2 = cedula.substr(1, 4);
                const conGuion3 = cedula.substr(5, 7);
                const conGuion = conGuion1 + "-" + conGuion2 + "-" + conGuion3;
    
    
    
    
    
                //Validar si el usuario existe
                const existeEgresado = await Egresado.findOne({
                    $or: [{ cedula: cedula }, { cedula: sinGuion }, { cedula: conGuion }],
                    estado:'ACTIVO'
                  });
 
                if(!existeEgresado){
                    try {
                        const egresado = new Egresado(nuevaCarga);
                        await egresado.save();
                     
                    } catch (error) {
                        data.push(egresado)

                        console.log(error)
                    }
                }else{
                    data.push(existeEgresado)

                }
          
            }
            console.log(data)
           return data
        },
        
        actualizarEgresado: async (_, {id, input})=>{
 
            let egresado = await Egresado.findById(id);
            if(!egresado){
                throw new Error("El egresado no existe");
            }
            egresado = await Egresado.findOneAndUpdate({_id: id}, input), {
                new: true,
            }
            return egresado;
        },
        desactivarEgresado: async (_,{id })=>{
            //Validar que el usario exista
            let egresado = await Egresado.findById(id);
            if(!egresado){
                throw new Error("El egresado no existe");
            }

            //Desactivar Egresado
            egresado = await Egresado.findOneAndUpdate({_id: id}, {estado: "INACTIVO"},{
                new: true,
            });

            return "Egresado eliminado correctamente";
        }
    }
}

module.exports = resolvers;