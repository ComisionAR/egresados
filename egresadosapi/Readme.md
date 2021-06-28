//Usuario
mutation crearUsuario($input: usuarioInput){
  crearUsuario(input: $input){
  			id
        nombre
        cedula
        apellido
        provincia
        canton
        distrito
        direccion
        telefonos{
          telefono
        }
        fecha_nacimiento
        perfil
        foto
        email{
          email
        }
        estado
        creado
    }
}

{
  "input": {
    "nombre": "Cristopher2",
    "cedula": "60462032",
    "apellido": "NR",
    "provincia": "NR",
    "canton": "NR",
    "distrito": "NR",
    "direccion": "NR",
    "telefonos": [{"telefono": "67869"}],
    "fecha_nacimiento": "05/09/2021",
    "perfil": "..",
    "foto": "...",
    "email": [{"email": "correo@gmail.com"}],
    "clave": "12345",
    "estado": "ACTIVO"
  }
}


///////////////////
mutation autenticarUsuario($input: autenticarInput){
  autenticarUsuario(input: $input){
    token
  }
}

{
  "input": {
    "cedula": "604620392",
    "clave": "12345"
  }
}

//////////
query obtenerUsuario{
  obtenerUsuario{
    id
    nombre
  }
}

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTY5ODZiNTIyNGNhOTQ2ZmU4NGYzOSIsImNlZHVsYSI6IjYwNDYyMDMyIiwiaWF0IjoxNjIxNjA1MTQxLCJleHAiOjE2MjE2MDg3NDF9.Xqjz5PODOfnmsKpCsNRyMW9Nj-s3hM-U-vnAvvxknf0"
}

////////////////////
query obtenerUsuarioId($id:ID!){
  obtenerUsuarioId(id: $id){
    		id
        nombre
        cedula
        apellido
        provincia
        canton
        distrito
        direccion
        telefonos{
          telefono
        }
        fecha_nacimiento
        perfil
        foto
        email{
          email
        }
        estado
  }
}

{
  "id":"60a7b1d8fe0efaac184ba194"
}

////////////////////

mutation actualizarUsuario($id: ID!, $input: usuarioInput){
	actualizarUsuario(id: $id, input: $input){
    		id
        nombre
        cedula
        apellido
        provincia
        canton
        distrito
        direccion
        telefonos{
          telefono
        }
        fecha_nacimiento
        perfil
        foto
        email{
          email
        }
        estado
        creado
  }
}

{
  "id": "60a5431cd62238862706ba03",
  "input": {
    "nombre": "Cristopher Galea Muri",
    "cedula": "604620392",
    "apellido": "NR",
    "provincia": "NR",
    "canton": "NR",
    "distrito": "NR",
    "direccion": "Rio claro",
    "telefonos": [{"telefono": "67869"}],
    "fecha_nacimiento": "05/09/2021",
    "perfil": "..",
    "foto": "...",
    "email": [{"email": "correo@gmail.com"}],
    "clave": "12345",
    "estado": "ACTIVO"
  }
}

////////////////////
mutation desactivarUsuario($id:ID!){
	desactivarUsuario(id: $id){
     			id
        nombre
        cedula
        apellido
        provincia
        canton
        distrito
        direccion
        telefonos{
          telefono
        }
        fecha_nacimiento
        perfil
        foto
        email{
          email
        }
        estado
        creado
  }
}

{
  "id": "60a5431cd62238862706ba03"
}



  /////////////////
  query obtenerUsuarios($estado: Estado!){
  obtenerUsuarios(estado: $estado){
        id
        nombre
        cedula
        apellido
        provincia
        canton
        distrito
        direccion
        telefonos{
          telefono
        }
        fecha_nacimiento
        perfil
        foto
        email{
          email
        }
        estado
        creado
  }
}

{
  "estado": "ACTIVO"
}



/////Carreras

query obtenerCarreraId($id:ID!){
  	obtenerCarreraId(id: $id){
        id
    	codigo
    	nombre
    	estado
  }
}

{
  "id":"60a6ae99c191fa0c881e9a8a"
}

////////////

query obtenerCarreras($estado: Estado!){
  obtenerCarreras(estado: $estado){
       id
    codigo
    nombre
    estado
  }
}

{
  "estado": "ACTIVO"
}

////////////
mutation desactivarCarrera($id: ID!){
  desactivarCarrera(id: $id){
    id
    codigo
    nombre
    estado
  }
}

{
  "id": "60a6ae99c191fa0c881e9a8a"
}


///////////////////

mutation actualizarCarrera($id:ID!, $input: carreraInput, $codigo:String){
  actualizarCarrera(id: $id, input: $input, codigo: $codigo){
    id
    codigo
    nombre
    estado
  }
}

{
  "id":"60a6ae99c191fa0c881e9a8a",
  "codigo": "IG",
  "input": {
    "codigo": "IG",
    "nombre": "Ingenieria 4",
    "estado": "ACTIVO"
  }
}


////////////
mutation insertarCarrera($input: carreraInput){
  insertarCarrera(input: $input){
    id
    codigo
    nombre
    estado
  }
}

{
  "input": {
    "codigo": "IF",
    "nombre": "Ingenieria2",
    "estado": "ACTIVO"
  }
}



////////////////EGRESADO
mutation insertarEgresado($input: egresadoInput){
  insertarEgresado(input: $input){
     	  id
        cedula
        nombre
        apellido
        telefonoPersonal{
          telefono
        }
        fecha_Nacimiento
        anioIngreso
        annioEgreso
      
        telefonoTrabajo{
          telefono
        } 
        labora
        trabajoActual
        correoUNA
        correoPersonal
        correoTrabajo
        estado
        creado
  }
}



{
  "input": {
    	"cedula": "69696865",
    	"nombre": "Egresado1",
    	"apellido": "Apellido",
    	"telefonoPersonal": [{"telefono": "8868686"}],
    	"fecha_Nacimiento": "14/05/2018",
    	"anioIngreso": "2015",
    	"annioEgreso": "2017",
    	"carrera": "60a6a1c913aea001c06c1276",
    	"telefonoTrabajo": [{"telefono": "000000"}],
    	"labora": "si",
    	"trabajoActual": "Ninguno",
    	"correoUNA": "correouna@una.com",
    	"correoPersonal": "correopersonal@gmail.com",
    	"correoTrabajo": "corrreotrabajo@gmail.com",
   		"estado": "ACTIVO"
  }
}


//////////////

query obtenerEgresados($estado: Estado!){
  obtenerEgresados(estado: $estado){
      id
        cedula
        nombre
        apellido
        telefonoPersonal{
          telefono
        }
        fecha_Nacimiento
        anioIngreso
        annioEgreso
      	carrera{
          id
          codigo
          nombre
        }
        telefonoTrabajo{
          telefono
        } 
        labora
        trabajoActual
        correoUNA
        correoPersonal
        correoTrabajo
        estado
        creado
  }
}

{
  "estado": "ACTIVO"
}


//////////////////////////

query obtenerEgresadoId($id:ID!){
  	obtenerEgresadoId(id: $id){
         id
        cedula
        nombre
        apellido
        telefonoPersonal{
          telefono
        }
        fecha_Nacimiento
        anioIngreso
        annioEgreso
      	carrera{
          id
          codigo
          nombre
        }
        telefonoTrabajo{
          telefono
        } 
        labora
        trabajoActual
        correoUNA
        correoPersonal
        correoTrabajo
        estado
        creado
  }
}


{
  "id": "60a8140b19cb3afef8b54965"
}

//////////////////////////


mutation actualizarEgresado($id: ID!, $input: egresadoInput){
  actualizarEgresado(id: $id , input: $input){
     id
        cedula
        nombre
        apellido
        telefonoPersonal{
          telefono
        }
        fecha_Nacimiento
        anioIngreso
        annioEgreso
      
        telefonoTrabajo{
          telefono
        } 
        labora
        trabajoActual
        correoUNA
        correoPersonal
        correoTrabajo
        estado
        creado
  }
}

{
  "id":"60a8140b19cb3afef8b54965",
  "input": {
    	"cedula": "69696865",
    	"nombre": "Egresado actualizado",
    	"apellido": "Apellido",
    	"telefonoPersonal": [{"telefono": "8868686"}],
    	"fecha_Nacimiento": "14/05/2018",
    	"anioIngreso": "2015",
    	"annioEgreso": "2017",
    	"carrera": "60a6a1c913aea001c06c1276",
    	"telefonoTrabajo": [{"telefono": "000000"}],
    	"labora": "si",
    	"trabajoActual": "Ninguno actualizado",
    	"correoUNA": "correouna@una.com",
    	"correoPersonal": "correopersonal@gmail.com",
    	"correoTrabajo": "corrreotrabajo@gmail.com",
   		"estado": "ACTIVO"
  }
}

////////////////
mutation desactivarEgresado($id: ID!){
  desactivarEgresado(id: $id){
       	id
        cedula
        nombre
        apellido
    		estado
  }
}

{
    "id": "60a8140b19cb3afef8b54965"
}

