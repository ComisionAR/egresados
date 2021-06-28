
import React, {useState} from 'react'; 
import Layout from '../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {Provincias} from '../components/Lugares/Provincias.json'
import {Cantones} from '../components/Lugares/Cantones.json';
import {Distritos} from '../components/Lugares/Distritos.json';
import { Icon, Divider , DatePicker, Notification , Loader} from 'rsuite';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';
import { withSecureHeaders } from 'next-secure-headers';

const NUEVO_USUARIO = gql`
    mutation crearUsuario($input: usuarioInput) {
        crearUsuario(input: $input) {
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


const nuevoUsuario = ()=> {
    
    const router = useRouter();
    const [ nuevoUsuario] = useMutation(NUEVO_USUARIO);
    const [telefonos, setTelefonos] = useState([]); 
    const [emails, setEmails] = useState([]); 
    const [fecha, SetFecha] = useState([]); 

  
    const cambiarTelefono = (i, e) => {
        const nuevo = telefonos.map((telefono, index) => {
            if (i !== index) return telefono;
            return {
                ...telefono,
                telefonos: e.target.value
            }
        });
        setTelefonos(nuevo)
    }
    const cambiarEmail = (i, e) => {
        const nuevo = emails.map((email, index) => {
            if (i !== index) return email;
            return {
                ...email,
                email: e.target.value
            }
        });
        setEmails(nuevo)
    }
    const handleDateChange = date => {
        SetFecha(date);
      };

   


    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            cedula:'', 
            provincia:'', 
            canton: '', 
            distrito:'',
            direccion:''
        },
        validationSchema: Yup.object({
            nombre: Yup.string() 
            .required('El nombre del usuario es obligatorio'),
            apellido: Yup.string() 
                        .required('El apellido del usuario es obligatorio'),
            cedula: Yup.string() 
                        .required('La cédula del usuario es obligatorio'),
            provincia: Yup.string() 
                          .required('Seleccione la provincia')
                          ,
            canton: Yup.string() 
                        .required('Seleccione el cantón')
                        ,
            distrito: Yup.string() 
                        .required('Seleccione el distrito')
                        ,
            direccion: Yup.string() 
                        .required('La dirección del usuario es obligatoria')




        }), 
        onSubmit: async valores => {

            const {nombre, apellido, cedula, provincia, canton, distrito, direccion,fecha_nacimiento } = valores
            const email = []
            const telefono = []
            emails.map(item => {
                email.push(Object.assign({},{
                    email: item.email 
                }))
            })
    
            telefonos.map(item => {
                telefono.push(Object.assign({},{
                    telefonos: item.telefonos
                }))
    
    
            })
            try {
                const { data } = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            cedula, 
                            provincia,
                            canton, 
                            distrito,
                            direccion, 
                            email,
                            telefonos:telefono,
                            fecha_nacimiento:fecha_nacimiento.toString(),
                            clave: '0000',
                            estado:'ACTIVO', 
                            perfil: 'null'
                        }
                    }
                });
        
                Swal.fire(
                    'Creado',
                    'El usuario se ha creado correctamente',
                    'success'
                )
                router.push('/usuarios'); 
            } catch (error) {
                Swal.fire(
                    'Error',
                     'Compruebe su información o si la cédula ya existe',
                    'error'
                )
            }
        }
    })




    return(

        <>
            <Layout>    
                 <h1 className="text-2xl text-gray-800 font-light">Nuevo Usuario</h1>

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
                                                placeholder="Nombre Usuario"
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
                                            placeholder="Apellido Usuario"
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


                                    
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                            Provincia
                                        </label>
                                    <select
                                        id="provincia"
                                        value={formik.values.provincia}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                     {
                                            Provincias.map((item, index) => (
                                                <option key ={index} value ={item.Codigo} >{item.Nombre}</option>
                                            ))
                                        
                                     }

                                       
                                    </select>

                                </div>

                                <div className="col">


                                    
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                            Cantón
                                        </label>
                                    <select
                                        id="canton"
                                        value={formik.values.canton}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                     {

                                            Cantones.map((item, index) => {
                                       
                                                if(item.Provincia===formik.values.provincia){
                               
                                                    
                                                    return <option key ={index} value ={item.Codigo} >{item.Nombre}</option>
                                                }
                                                
                                            })
                                     }

                                       
                                    </select>

                                </div>
                                <div className="col">


                                                                        
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="distrito">
                                                Distrito
                                            </label>
                                        <select
                                            id="distrito"
                                            value={formik.values.distrito}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                        {

                                                

                                                Distritos.map((item, index) => {
                                               
                                                    if(item.Canton === formik.values.canton){
                                                        return <option key ={index} value ={item.Nombre} >{item.Nombre}</option>
                                                    }
                                                    
                                                })
                                        }

                                        
                                        </select>

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
                                        <input className="form-control" type="date"   onChange={formik.handleChange}  value={formik.values.fecha_nacimiento} id="fecha_nacimiento"/>
                       
                                      
                                    </div>


                                    </div>
                                </div>









                           
                                <div className="form-group col-md-12">
                                    <Divider>Teléfonos</Divider>
                                </div>
                                {telefonos.map((input, index) => (
                                    <div key={index} className="form-group col-md-6">
                                        <label>Telefono {index + 1}: </label>
                                        <div className="input-group">
                                            <input
                                                onChange={ e => cambiarTelefono(index, e)}
                                                type="text"
                                                placeholder="Teléfono"
                                                value={input.telefonos}
                                            
                                                className="form-control"
                                            />
                                            <div className="input-group-append">
                                            <button onClick={() => { const delet = telefonos.filter((item, i) => i !== index); setTelefonos(delet) }} type="button" id="sidebarCollapse" class="btn btn-danger m-2"  >
                                                                    <Icon icon='trash2'  />
                                                                                                        
                                            </button>
                                            
                                            </div>
                                        </div>
                                    </div>
                                ))}                        
                                  <div className="form-group col-md-12">
                                  <button style={{ width: 110 }} onClick={() => setTelefonos(telefonos.concat([{ telefonos: "" }]))} type="button"  class="btn btn-success m-2"  >
                                                                    <Icon icon='plus-square'  />
                                                                                                        
                                            </button>
                                     
                                    </div>  

                             <div className="form-group col-md-12">
                                    <Divider>Emails</Divider>
                                </div>
                                {emails.map((input, index) => (
                                    <div key={index} className="form-group col-md-6">
                                        <label>Emails {index + 1}: </label>
                                        <div className="input-group">
                                            <input
                                                onChange={ e => cambiarEmail(index, e)}
                                                type="text"
                                                placeholder="Email"
                                                value={input.email}
                                            
                                                className="form-control"
                                            />
                                            <div className="input-group-append">
                                            <button onClick={() => { const delet = emails.filter((item, i) => i !== index); setEmails(delet) }} type="button" id="sidebarCollapse" class="btn btn-danger m-2"  >
                                                                    <Icon icon='trash2'  />
                                                                                                        
                                            </button>
                                            
                                            </div>
                                        </div>
                                    </div>
                                ))}                        
                                  <div className="form-group col-md-12">
                                  <button style={{ width: 110 }} onClick={() => setEmails(emails.concat([{ email: "" }]))} type="button"  class="btn btn-success m-2"  >
                                                                    <Icon icon='plus-square'  />
                                                                                                        
                                            </button>
                                     
                                    </div>  
    
                                    

                                    <div className="form-group col-md-12">
                                        <input
                                            type="submit"
                                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                            value="Registrar Usuario"
                                        /> 
                                   </div>

                                     
                            </form>  

                  </div>
               </div>
            </Layout>
      
        </>
    )


}

export default withSecureHeaders()(nuevoUsuario); 