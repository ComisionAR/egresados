import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client'
import  {useRouter, withRouter} from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Icon , IconButton} from 'rsuite';

const ELIMINAR_EGRESADO= gql`
    mutation desactivarEgresado($id: ID!) {
        desactivarEgresado(id:$id) 
    }
`;



const Egresado = ({egresado}) => {

    const router = useRouter()
    const [ desactivarEgresado ] = useMutation( ELIMINAR_EGRESADO  );

    const { id } = egresado;


    const confirmarEliminarEgresado= () => {
        Swal.fire({
            title: '¿Deseas eliminar a este usuario?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
          }).then( async (result) => {
            if (result.value) {

                try {
    



                    
            
                    const res= await desactivarEgresado({ variables: { id} })
                  
                    Swal.fire(
                        'Eliminado!',
                         res.desactivarEgresado,
                        'success'
                    )
                } catch (error) {
                    console.log("error");
                }
            }
          })
    }

    const editarEgresado = () => {
        router.push({
            pathname: "/editarEgresado/[id]",
            query: { id }
        })
    }

    return ( 
           <>

                 
                    <IconButton id="sidebarCollapse" className="btn m-2" onClick={confirmarEliminarEgresado} icon={<Icon icon='trash2'  size="5x" />} color="red" />
                   
                    <IconButton id="sidebarCollapse" className="btn m-2"  onClick={editarEgresado}  icon={<Icon icon='edit2'  size="5x" />} color="blue" />
               
           </>   
     );
}
 
export default Egresado;