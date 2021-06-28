import React,{useEffect} from 'react'; 
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import Layout from '../components/Layout'
import Link from 'next/link'
import {Loader} from 'rsuite'
import { withSecureHeaders } from "next-secure-headers";
  const OBTENER_USUARIO = gql`
  query obtenerUsuario{
      obtenerUsuario{
          id
          nombre
          apellido
      }
  }
`;



const Index = () => {

  const router = useRouter();



return(
  <Layout>  <h1 className="text-2xl text-gray-800 font-light">Sistema de Egresados</h1></Layout>
)

}

export default withSecureHeaders()(Index)
