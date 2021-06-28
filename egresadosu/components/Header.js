import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;

const Header = () => {

    const router = useRouter();
    const cookies = new Cookies();
  
    const { data, loading, error} = useQuery(OBTENER_USUARIO);

    if(loading) return null;

    else{

        if(!data.obtenerUsuario &&  cookies.get('_tk__Access') ===undefined) {
           
          try {
            router.push('/login');
          } catch (error) {
              
          }
         
        }


    }


    return (  
        <>

        </>
        
     );
}
 
export default Header;