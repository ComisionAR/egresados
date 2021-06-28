import React, { useState, useEffect } from 'react';
import { useRouter, withRouter} from 'next/router'
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation, enableExperimentalFragmentVariables } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import {Provincias} from '../../components/Lugares/Provincias.json'
import {Cantones} from '../../components/Lugares/Cantones.json';
import {Distritos} from '../../components/Lugares/Distritos.json';
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Icon, Divider , DatePicker,Loader,Notification} from 'rsuite';


const OBTENER_USUARIO = gql`
query obtenerUsuario{
    obtenerUsuario{
        id
        nombre
        apellido
    }
}
`;


const OBTENER_EGRESADO= gql`
query obtenerEgresadoId($id:ID!){
    obtenerEgresadoId(id:$id){
        id,
        cedula,
        nombre,
        apellido,
        telefonoPersonal,
        fecha_Nacimiento,
        annioIngreso,
        annioEgreso,
        carrera,
        telefonoTrabajo,
        labora,
        trabajoActual,
        correoUNA,
        correoPersonal,
        correoTrabajo,
         estado,
        direccion,
        creado

  }
}
`;
const ACTUALIZAR_EGRESADO= gql`
mutation  actualizarEgresado($id: ID!, $input: egresadoInput){
    actualizarEgresado(id:$id, input:$input){
      id
     
    }
  }
`;



const editarEgresado = () =>{
    const router = useRouter();
  
     const id = router.query.pid;

  
     const { data, loading, error } = useQuery(OBTENER_EGRESADO, {
        variables: {
           id
        }
    });
    const [ actualizarEgresado] = useMutation( ACTUALIZAR_EGRESADO );
    const [labora, setLabora] = useState("0"); 
    const [fecha, SetFecha] = useState(new Date()); 
 


    const handleDateChange = date => {
        SetFecha(date);
      };




    const schemaValidacion = Yup.object({
        nombre: Yup.string() 
        .required('El nombre del egresado es obligatorio'),
        apellido: Yup.string() 
                    .required('Los apellidos del egresado son obligatorios'),
        cedula: Yup.string() 
                    .required('La cédula del egresado es obligatorio'),
        annioEgreso: Yup.string() 
                                .required('El año de ingreso es obligatorio'),
        carrera: Yup.string() 
                                .required('La carrera del egresado es obligatorio'),
                    
                    
    });

    
    if(loading ) return    (<Loader backdrop content="Cargando..." vertical size="lg" />);
    if (error ) {
        Notification['error']({
            title: 'Error',
            duration: 20000,
            description: 'Verifique su conexión'
        })
    }
   
    const { obtenerEgresadoId} = data;


    const actualizarInfoEgresado = async valores => {
        const {nombre, apellido, fecha_Nacimiento, cedula, telefonoPersonal, annioEgreso, annioIngreso, carrera, telefonoTrabajo,  trabajoActual, correoUNA, correoPersonal, correoTrabajo, direccion } = valores
    
     
        try {
            const { data} = await actualizarEgresado({
                variables: {
                    id,
                    input: {
                        nombre,
                             apellido,
                              cedula, 
                              telefonoPersonal, 
                              fecha_Nacimiento : fecha_Nacimiento.toString(), 
                              annioEgreso,
                               annioIngreso,
                                carrera,
                                 telefonoTrabajo,
                                  labora:labora,
                                   trabajoActual, 
                                   correoUNA, 
                                   correoPersonal,
                                    correoTrabajo,
                                     direccion,
                                     estado: 'ACTIVO'
                    }
                }
            });
         
         
            Swal.fire(
                'Actualizado',
                'El usuario se actualizó correctamente',
                'success'
            )

      
            router.push('/egresados');
        } catch (error) {
            console.log("error");
        }
    }

    return(
        <>
            <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Egresado</h1>
          
            
      <div className="flex justify-center mt-5">
                <div className="w-full ">

                    <Formik
                        validationSchema={ schemaValidacion }
                        enableReinitialize
                        initialValues={ obtenerEgresadoId }
                        onSubmit={ ( valores ) => {
                            actualizarInfoEgresado(valores)
                        }}
                    >

                    {props => {
             
                    return (
                        <form
                        className={"bg-white shadow-md px-8 pt-6 pb-4 mb-4"}
                        onSubmit={props.handleSubmit}
                    >

                        <div className="form-row">
                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Nombre
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="nombre"
                                        type="text"
                                        placeholder="Nombre Cliente"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.nombre}
                                    />
                                </div>

                                { props.touched.nombre && props.errors.nombre ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.nombre}</p>
                                    </div>
                                ) : null  } 



                            </div>
                            <div className="col">
                                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    Apellidos
                                </label>

                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido Cliente"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.apellido}
                                />
                            </div>

                            { props.touched.apellido && props.errors.apellido ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.apellido}</p>
                                </div>
                            ) : null  }





                            </div>
                        </div>

                        <div className="form-row">
                        <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Cédula
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="cedula"
                                        type="text"
                                        placeholder="Cédula"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.cedula}
                                    />
                                </div>

                                { props.touched.cedula && props.errors.cedula ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.cedula}</p>
                                    </div>
                                ) : null  } 



                            </div>
                 

                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Teléfono Personal 
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="telefonoPersonal"
                                        type="text"
                                        placeholder="Teléfono Personal "
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.telefonoPersonal}
                                    />
                                </div>

                                { props.touched.telefonoPersonal && props.errors.telefonoPersonal ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.telefonoPersonal}</p>
                                    </div>
                                ) : null  } 



                            </div>
                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Teléfono del Trabajo   
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="telefonoTrabajo"
                                        type="text"
                                        placeholder="Teléfono Trabajo "
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.telefonoTrabajo}
                                    />
                                </div>

                                { props.touched.telefonoTrabajo && props.errors.telefonoTrabajo ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.telefonoTrabajo}</p>
                                    </div>
                                ) : null  } 



                            </div>

                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Año ingreso 
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="annioIngreso"
                                        type="text"
                                        placeholder="Año ingreso "
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.annioIngreso}
                                    />
                                </div>




                            </div>



                             <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Año egreso 
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="annioEgreso"
                                        type="text"
                                        placeholder="Año egreso "
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.annioEgreso}
                                    />
                                </div>

                                { props.touched.annioEgreso && props.errors.annioEgreso ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.annioEgreso}</p>
                                    </div>
                                ) : null  } 



                            </div>          




                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Labora  
                                    </label>
                                    <select
                                        value={labora}
                                        onChange={ e => setLabora(e.target.value)}
                        
                                    >
                                        <option value="0">SI</option>
                                        <option value="1">NO</option>

                                    </select>
                                 
                                </div>



                            </div>       

                   
                        </div>          
                       


                        <div className="form-row">
                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Señas
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="direccion"
                                        type="text"
                                        placeholder="Dirección"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.direccion}
                                    />
                                </div>

                             



                            </div>
                            <div className="col">
                                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    Fecha Nacimiento
                                </label>
                                <input className="form-control" type="date"   onChange={props.handleChange}  value={props.values.fecha_Nacimiento} id="fecha_Nacimiento"/>
                            </div>


                            </div>
                        </div>


                        <div className="form-row">
                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Carrera
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="carrera"
                                        type="text"
                                        placeholder="Carrerra"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.carrera}
                                    />
                                </div>

                             



                            </div>
  
                        </div>
                        <div className="form-row">
                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Correo institucional
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="correoUNA"
                                        type="text"
                                        placeholder="Correo Institucional"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.correoUNA}
                                    />
                                </div>
                            </div>



                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Correo Personal
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="correoPersonal"
                                        type="text"
                                        placeholder="Correo Personal"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.correoPersonal}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Correo Trabajo
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="correoTrabajo"
                                        type="text"
                                        placeholder="Correo Personal"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.correoTrabajo}
                                    />
                                </div>
                            </div>
                        </div>            

                        <div className="form-row">
                            <div className="col">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Trabajo Actual
                                    </label>

                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="trabajoActual"
                                        type="text"
                                        placeholder="Trabajo actual"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.trabajoActual}
                                    />
                                </div>

                             



                            </div>
  
                        </div>           

                     

                        <div className="form-group col-md-12">
                                        <input
                                            type="submit"
                                            className="bg-gray-800  ml-0 mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 max-w-lg content-center"
                                            value="Actualizar Usuario"
                                        />     
                                   </div>
                             
                    </form>  
                        )
                    }}
                    </Formik> 
                </div>
            </div>

          
          
          
            </Layout>

        </>
    )


}


export default editarEgresado;