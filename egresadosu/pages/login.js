import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {useFormik} from "formik";
import * as Yup from "yup";
import { gql, useMutation,useQuery} from "@apollo/client";
import { useCookies } from 'react-cookie';
import {useRouter} from "next/router";
import Swal from 'sweetalert2';
import {Loader} from 'rsuite'
import Cookies from 'universal-cookie';
import { withSecureHeaders } from "next-secure-headers";
const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: autenticarInput){
        autenticarUsuario(input: $input){
            token
        }
    }
`;



const Login = () =>{
   
    const cookies = new Cookies();
    const router = useRouter();

    useEffect(() => {
      
        if( cookies.get('_tk__Access') !==undefined){
            setTimeout(() => {
                router.push("/usuarios");
            }, 2000);
        }   
      });
    
   

    const [mensaje, guardarMensaje] = useState(null);


    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    
    const formik = useFormik({
        initialValues: {
            cedula: "",
            clave: ""
        },
        validationSchema: Yup.object({
            cedula: Yup.string().required("La cédula no puede ir vacia"),
            clave: Yup.string().required("La contraseña es obligatoria")
        }),
        onSubmit: async valores =>{
           
            const {cedula , clave } = valores;

           try {
                const {data} = await autenticarUsuario({
                    variables: {
                        "input":{
                            cedula,
                            clave
                        }
                    }
                });
                
                guardarMensaje("Autenticando ...")

              
                const { token } = data.autenticarUsuario;


                cookies.set('_tk__Access',token,{httpOnlyL:true, secure:true, path:'/'})
              

         
                setTimeout(() => {
                    guardarMensaje(null);
                    router.push("/");
                }, 2000);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Bienvenido',
                    showConfirmButton: false,
                    timer: 1500
                  })

            } catch (error) {
            
                guardarMensaje(error.message.replace("GraphQL error: ", ""));
                setTimeout(()=>{
                    guardarMensaje(null);
                }, 3000)
                
            }
        }
    }) 



   
    const mostrarMensaje = () =>{
        return(
            <div className="bg-gray-200 rounded border-l-4 border-gray-300 py-0 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }
   
     
    return(
        <>
            <Layout>  
                <h1 className="text-center text-3xl text-white font-light">Log in</h1>
                {mensaje && mostrarMensaje()}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-xl ">
                        <form className={"bg-gray-100 rounded px-8 pt-6 pb-8 mb-4"}
                        onSubmit={formik.handleSubmit}>
                            <div >
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cedula">
                                    Identificación
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300" 
                                    id="cedula"
                                    type="text"
                                    placeholder="Cédula"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    values={formik.values.cedula}
                                />
                            </div>
                            
                            { formik.touched.cedula && formik.errors.cedula ? (
                                <div className="my-1 text-red-700 p-0 flex ">
                                    <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    <p className="ml-1">{formik.errors.cedula}</p>
                                </div>
                            ): null}


                            <div className="mt-5 mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clave">
                                    Contraseña
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300" 
                                    id="clave"
                                    type="password"
                                    placeholder="Contraseña"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    values={formik.values.clave}
                                />
                            </div>

                            { formik.touched.clave && formik.errors.clave ? (
                                <div className="my-1 text-red-600 p-0 flex">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    <p className="ml-1">{formik.errors.clave}</p>
                                </div>
                            ): null}

                          <a  href="/olvideContrasenna" className="text-left text-sm text-gray-800 font-bold ">Olvidé mi contraseña</a>    
                            <input 
                                type="submit"
                                className="bg-purple-800 w-full mt-5 p-2 text-white hover:bg-purple-900" 
                                value="Iniciar Sesión"
                            />

                            
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default withSecureHeaders()(Login);