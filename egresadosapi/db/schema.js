const {gql} = require("apollo-server");


//Schema
const typeDefs = gql`

    type Token{
        token: String
    }
    type Telefono{
        telefonos: String
    }
    type Email{
        email: String
    }
    enum Estado{
        ACTIVO
        INACTIVO
    }


    type Usuario{
        id: ID
        nombre: String
        cedula: String
        apellido: String
        provincia: String
        canton: String
        distrito: String
        direccion: String
        telefonos: [Telefono]
        fecha_nacimiento: String
        perfil: String
        foto: String
        email: [Email]
        estado: Estado
        creado: String      
    }
    input TelefonoInput{
        telefonos: String
    }

    input EmailInput{
        email: String
    }

    input usuarioInput {
        nombre: String
        cedula: String
        apellido: String
        provincia: String
        canton: String
        distrito: String
        direccion: String
        telefonos: [TelefonoInput]
        fecha_nacimiento: String
        perfil: String
        foto: String
        email: [EmailInput]
        clave: String
        estado: Estado
    }

    input autenticarInput{
        cedula: String!
        clave: String!
    }


    type Carrera{
        id: ID
        codigo: String 
        nombre: String
        estado: Estado
    }

    input carreraInput{
        codigo: String 
        nombre: String
        estado: Estado
    }


    type Egresado{
        id:ID
        cedula: String
        nombre: String
        apellido: String
        telefonoPersonal: String
        fecha_Nacimiento: String
        annioIngreso: String
        annioEgreso: String
        carrera: String
        telefonoTrabajo: String
        labora: String
        trabajoActual: String
        correoUNA: String
        correoPersonal: String
        correoTrabajo: String
        estado: String
        direccion:String
        creado: String
    }
    input egresadoInput{
        cedula: String
        nombre: String
        apellido: String
        telefonoPersonal: String 
        fecha_Nacimiento: String
        annioIngreso: String
        annioEgreso: String
        carrera: String
        telefonoTrabajo: String
        labora: String
        trabajoActual: String
        correoUNA: String
        correoPersonal: String
        correoTrabajo: String
        direccion:String
        estado: Estado
    }

    input egresadoExcelInput{
        data: [egresadoInput]
    }
    type Query{
        
        obtenerUsuario: Usuario
        obtenerUsuarioId(id:ID!): Usuario
        obtenerUsuarios(estado:Estado!): [Usuario]

        obtenerCarreras(estado: Estado!): [Carrera]
        obtenerCarreraId(id:ID!): Carrera

        obtenerEgresados(estado: Estado!): [Egresado]
        obtenerEgresadoId(id: ID!): Egresado
        
    }
     type Mutation {
        nuevaContrasenna(cedula:String): String
        crearUsuario(input: usuarioInput): Usuario
        autenticarUsuario(input: autenticarInput): Token
        actualizarUsuario(id: ID!, input: usuarioInput): Usuario
        actualizarPassword(id:ID!, actual:String, nueva:String):String
        desactivarUsuario(id:ID!): String

        insertarCarrera(input: carreraInput): Carrera
        actualizarCarrera(id: ID!, input: carreraInput, codigo:String): Carrera 
        desactivarCarrera(id:ID!): Carrera

        insertarEgresado(input: egresadoInput): Egresado
        insertarCargaExcel(input: egresadoExcelInput): [Egresado]
        actualizarEgresado(id: ID!, input: egresadoInput): Egresado
        desactivarEgresado(id: ID!): String
     }
`;

module.exports = typeDefs;
