import React, {useState} from 'react'; 
import Layout from '../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {Provincias} from '../components/Lugares/Provincias.json'
import {Cantones} from '../components/Lugares/Cantones.json';
import {Distritos} from '../components/Lugares/Distritos.json';
import { Icon, Divider , DatePicker, Loader, Notification } from 'rsuite';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';
import { withSecureHeaders } from "next-secure-headers";
const NUEVO_EGRESADO= gql`
    mutation insertarEgresado($input: egresadoInput) {
        insertarEgresado(input: $input) {
            id
       
        }
    }
`;

const OBTENER_USUARIO = gql`
query obtenerUsuario{
    obtenerUsuario{
        id
        nombre
        apellido
    }
}
`;


const nuevoEgresado = () =>{   
    const router = useRouter()
    

  
    const [labora, setLabora] = useState("0"); 
    const [fecha, SetFecha] = useState(new Date()); 
    const [ nuevoEgresado] = useMutation(NUEVO_EGRESADO);


    const handleDateChange = date => {
        SetFecha(date);
      };




    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            cedula:'', 
            telefonoPersonal: '', 

            annioEgreso: '', 
            annioIngreso: '', 
            carrera: '', 
            telefonoTrabajo: '', 
         
            trabajoActual:'', 
            correoUNA: '', 
            correoPersonal: '', 
            correoTrabajo: '', 
            direccion:''

        },
        validationSchema: Yup.object({
            nombre: Yup.string() 
            .required('El nombre del egresado es obligatorio'),
            apellido: Yup.string() 
                        .required('Los apellidos del egresado son obligatorios'),
            cedula: Yup.string() 
                        .required('La cédula del egresado es obligatoria'),
            annioEgreso: Yup.string() 
                                    .required('El año de ingreso es obligatorio'),
            carrera: Yup.string() 
                                    .required('La carrera del egresado es obligatorio'),
                        
                        



        }), 
        onSubmit: async valores => {

            const {nombre, apellido, cedula, telefonoPersonal, fecha_Nacimiento, annioEgreso, annioIngreso, carrera, telefonoTrabajo,  trabajoActual, correoUNA, correoPersonal, correoTrabajo, direccion } = valores
      
            try {
                const { data } = await nuevoEgresado({
                    variables: {
                        input: {
                            nombre,
                             apellido,
                              cedula, 
                              telefonoPersonal, 
                              fecha_Nacimiento:fecha_Nacimiento.toString(), 
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
                    'Creado',
                    'El egresado se ha creado correctamente',
                    'success'
                )
                router.push('/egresados'); 
            } catch (error) {
          
                Swal.fire(
                    'Error',
                     'Ocurrió un error',
                    'error'
                )
            }
        }
    })




    return(
        <>
            <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Egresado</h1>
            <div className="flex justify-center mt-5">
            <div className="w-full ">
                <form
                                className={"bg-white shadow-md px-8 pt-6 pb-4 mb-4"}
                                onSubmit={formik.handleSubmit}
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
                                                placeholder="Nombre Egresado"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.nombre}
                                            />
                                        </div>

                                        { formik.touched.nombre && formik.errors.nombre ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                                <p className="font-bold">Error</p>
                                                <p>{formik.errors.nombre}</p>
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
                                            placeholder="Apellidos Egresado"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.apellido}
                                        />
                                    </div>

                                    { formik.touched.apellido && formik.errors.apellido ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                            <p className="font-bold">Error</p>
                                            <p>{formik.errors.apellido}</p>
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
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.cedula}
                                            />
                                        </div>

                                        { formik.touched.cedula && formik.errors.cedula ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                                <p className="font-bold">Error</p>
                                                <p>{formik.errors.cedula}</p>
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
                                                placeholder="Teléfono Personal"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.telefonoPersonal}
                                            />
                                        </div>

                                        { formik.touched.telefonoPersonal && formik.errors.telefonoPersonal ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                                <p className="font-bold">Error</p>
                                                <p>{formik.errors.telefonoPersonal}</p>
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
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.telefonoTrabajo}
                                            />
                                        </div>

                                        { formik.touched.telefonoTrabajo && formik.errors.telefonoTrabajo ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                                <p className="font-bold">Error</p>
                                                <p>{formik.errors.telefonoTrabajo}</p>
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
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.annioIngreso}
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
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.annioEgreso}
                                            />
                                        </div>

                                        { formik.touched.annioEgreso && formik.errors.annioEgreso ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                                <p className="font-bold">Error</p>
                                                <p>{formik.errors.annioEgreso}</p>
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
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.direccion}
                                            />
                                        </div>

                                     



                                    </div>
                                    <div className="col">
                                            <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                            Fecha Nacimiento
                                        </label>
                                        <input className="form-control" type="date"   onChange={formik.handleChange}  value={formik.values.fecha_Nacimiento} id="fecha_Nacimiento"/>
                       
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
                                                placeholder="Carrera"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.carrera}
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
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.correoUNA}
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
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.correoPersonal}
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
                                                placeholder="Correo Trabajo"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.correoTrabajo}
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
                                                placeholder="Trabajo Actual"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.trabajoActual}
                                            />
                                        </div>

                                     



                                    </div>
          
                                </div>           

                             

                                <div className="form-group col-md-12">
                                        <input
                                            type="submit"
                                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                            value="Registrar Egresado"
                                        /> 
                                   </div>
                                     
                            </form>  

                  </div>
               </div>
            </Layout>
        </>
    )
}

export default withSecureHeaders()(nuevoEgresado); 