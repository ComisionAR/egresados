import React from 'react'; 
import Layout from '../components/Layout'
import {useFormik} from "formik";
import * as Yup from "yup";
import { gql, useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import Swal from 'sweetalert2';
import { withSecureHeaders } from 'next-secure-headers';



const  NUEVA_CONTRASEÑA = gql`
    mutation nuevaContrasenna($cedula:String){
        nuevaContrasenna(cedula:$cedula)
    }
`;


const olvideContrasenna = () => {




    const router = useRouter();
    const [nuevaContrasenna] = useMutation(NUEVA_CONTRASEÑA);


    const formik = useFormik({
        initialValues: {
            cedula: ""
        },
        validationSchema: Yup.object({
            cedula: Yup.string().required("La cédula no puede ir vacia"),
        }),
        onSubmit: async valores =>{
          
            const {cedula , clave } = valores;

           try {
                const {data} = await nuevaContrasenna({
                    variables: {
                         cedula
                    }
                });
                
                if(data.nuevaContrasenna ===""){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Verifique su cédula',
                        showConfirmButton: false,
                        timer: 4000
                      })
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Se envió el correo con su nueva contraseña.',
                        showConfirmButton: false,
                        timer: 4000
                      })
                      router.push('/login')
                }
           

              

            } catch (error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Verifique su cédula',
                    showConfirmButton: false,
                    timer: 4000
                  })
            }
        }
    }) 



    return(
        <>
        <Layout>
        <h1 className={"text-center text-3xl text-white font-light"}>Olvidé contraseña</h1>
        <div className={"flex justify-center mt-5"}>
                    <div className="w-full max-w-xl ">
                        <form className={"bg-gray-100 rounded px-8 pt-6 pb-8 mb-4"}
                        onSubmit={formik.handleSubmit}>
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cedula">
                                    Identificación
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300" 
                                    id="cedula"
                                    type="text"
                                    placeholder="Ingrese su cédula"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    values={formik.values.cedula}
                                />
                            </div>
                            
                            { formik.touched.cedula && formik.errors.cedula ? (
                                <div className="my-1 text-red-700 p-0 flex ">
                                    <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    <p className="ml-1">{formik.errors.cedula}</p>
                                </div>
                            ): null}


                            <a  href="/login" className="text-left text-sm text-gray-800 font-bold mt-4">Log in</a>    
                       

                            <input 
                                type="submit"
                                className="bg-purple-800 w-full mt-5 p-2 text-white hover:bg-purple-900" 
                                value="Comprobar"
                            />

                            
                        </form>
                    </div>
                </div>
        
        
        
        
        </Layout>


        </>
    )




}

export default withSecureHeaders()(olvideContrasenna);