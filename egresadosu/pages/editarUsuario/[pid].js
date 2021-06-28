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
import { Icon, Divider , DatePicker , Loader,Notification} from 'rsuite';
const OBTENER_USUARIO = gql`
query obtenerUsuarioId($id:ID!){
    obtenerUsuarioId(id:$id){
      id
      nombre
      apellido 
     	provincia
         cedula
    canton
    distrito
    direccion
    fecha_nacimiento
    perfil
    foto
    email{
      email
    }
    telefonos{
      telefonos
    }
    }
  }
`;
const ACTUALIZAR_USUARIO = gql`
mutation  actualizarUsuario($id: ID!, $input: usuarioInput){
    actualizarUsuario(id:$id, input:$input){
      id
     
    }
  }
`;

const OBTENER_USUARIOL = gql`
query obtenerUsuario{
    obtenerUsuario{
        id
        nombre
        apellido
    }
}
`;

const editarUsuario = () =>{
    const router = useRouter();
  
 
     const id = router.query.pid;
    const [telefonos, setTelefonos] = useState([]); 
    const [emails, setEmails] = useState([]); 
    const [fecha, SetFecha] = useState([]); 
 
    const { data, loading, error } = useQuery(OBTENER_USUARIO, {
        variables: {
           id
        }
    });
    const [ actualizarUsuario] = useMutation( ACTUALIZAR_USUARIO );
    const schemaValidacion = Yup.object({
        nombre: Yup.string() 
                    .required('El nombre del usuario es obligatorio'),
        apellido: Yup.string() 
                    .required('El apellido del usuario es obligatorio'),
        cedula: Yup.string() 
                    .required('La cédula del usuario es obligatorio')
   
    });
    useEffect(() => {
      if(data){
        setTelefonos(data.obtenerUsuarioId.telefonos)
        setEmails(data.obtenerUsuarioId.email)
        SetFecha(data.obtenerUsuarioId.fecha_nacimiento)
      }
    }, [data])
  
    if(loading ) return    (<Loader backdrop content="Cargando..." vertical size="lg" />);
    if (error ) {
        Notification['error']({
            title: 'Error',
            duration: 20000,
            description: 'Verifique su conexión'
        })
    }


    const { obtenerUsuarioId} = data;
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






      const actualizarInfoUsuario = async valores => {
        const { nombre, apellido,cedula, provincia, canton, distrito, direccion, fecha_nacimiento} = valores;
        
       
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
            const { data} = await actualizarUsuario({
                variables: {
                    id,
                    input: {
                        nombre, 
                        apellido,
                        cedula,
                        provincia, 
                        canton, 
                        distrito, 
                        direccion, 
                        email, 
                        telefonos: telefono, 
                        fecha_nacimiento: fecha_nacimiento.toString()
                    }
                }
            });
       

  
       
            Swal.fire(
                'Actualizado',
                'El usuario se actualizó correctamente',
                'success'
            )


            router.push('/usuarios');
        } catch (error) {
            console.log("error");
        }
    }











    return(
                <Layout>
                    
      <h1 className="text-2xl text-gray-800 font-light">Editar Usuario</h1>

      <div className="flex justify-center mt-5">
                <div className="w-full ">

                    <Formik
                        validationSchema={ schemaValidacion }
                        enableReinitialize
                        initialValues={ obtenerUsuarioId }
                        onSubmit={ ( valores ) => {
                            actualizarInfoUsuario(valores)
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
                                                placeholder="Nombre Usuario"
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
                                            placeholder="Apellido Usuario"
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


                                    
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                            Provincia
                                        </label>
                                    <select
                                        id="provincia"
                                        value={props.values.provincia}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
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
                                        value={props.values.canton}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    >
                                     {

                                            Cantones.map((item, index) => {
                                       
                                                if(item.Provincia===props.values.provincia){
                                             
                                                    
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
                                            value={props.values.distrito}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        >
                                        {

                                                

                                                Distritos.map((item, index) => {
                                               
                                                    if(item.Canton === props.values.canton){
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
                                        <input className="form-control" type="date"   onChange={props.handleChange}  value={props.values.fecha_nacimiento} id="fecha_nacimiento"/>
                       
                                      
                                    </div>


                                    </div>
                                </div>









                           
                                <div className="form-group col-md-12">
                                    <Divider>Teléfonos</Divider>
                                </div>
                                {telefonos.map((input, index) => (
                                    <div key={index} className="form-group col-md-6">
                                        <label>Teléfono {index + 1}: </label>
                                        <div className="input-group">
                                            <input
                                                onChange={ e => cambiarTelefono(index, e)}
                                                type="text"
                                                placeholder="Telefono"
                                                value={input.telefonos}
                                            
                                                className="form-control"
                                            />
                                            <div className="input-group-append">
                                            <button onClick={() => { const delet = telefonos.filter((item, i) => i !== index); setTelefonos(delet) }} type="button" id="sidebarCollapse" className="btn btn-danger m-2"  >
                                                                    <Icon icon='trash2'  />
                                                                                                        
                                            </button>
                                            
                                            </div>
                                        </div>
                                    </div>
                                ))}                        
                                  <div className="form-group col-md-12">
                                  <button style={{ width: 110 }} onClick={() => setTelefonos(telefonos.concat([{ telefonos: "" }]))} type="button"  className="btn btn-success m-2"  >
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
                                            <button onClick={() => { const delet = emails.filter((item, i) => i !== index); setEmails(delet) }} type="button" id="sidebarCollapse" className="btn btn-danger m-2"  >
                                                                    <Icon icon='trash2'  />
                                                                                                        
                                            </button>
                                            
                                            </div>
                                        </div>
                                    </div>
                                ))}                        
                                  <div className="form-group col-md-12">
                                  <button style={{ width: 110 }} onClick={() => setEmails(emails.concat([{ email: "" }]))} type="button"  className="btn btn-success m-2"  >
                                                                    <Icon icon='plus-square'  />
                                                                                                        
                                            </button>
                                     
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
    );


}

export default editarUsuario
