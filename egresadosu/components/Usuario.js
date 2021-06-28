import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client'
import  {useRouter, withRouter} from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton } from 'rsuite';
const ELIMINAR_USUARIO = gql`
    mutation desactivarUsuario($id: ID!) {
        desactivarUsuario(id:$id) 
    }
`;



const Usuario = ({usuario}) => {

    const router = useRouter()
    const [ desactivarUsuario ] = useMutation( ELIMINAR_USUARIO  );

    const { nombre, apellido, cedula, email, id } = usuario;

    const confirmarEliminarUsuario = () => {
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
               
           
                    const res= await desactivarUsuario({ variables: { id} })
               
                    Swal.fire(
                        'Eliminado!',
                         res.desactivarUsuario,
                        'success'
                    )
                } catch (error) {
                    console.log("error");
                }
            }
          })
    }

    const editarUsuario = () => {
        router.push({
            pathname: "/editarUsuario/[id]",
            query: { id }
        })
    }

    return ( 
           <>

     
                    <IconButton  id="sidebarCollapse" className="btn  m-2" onClick={confirmarEliminarUsuario} icon={<Icon icon='trash2'  size="5x" />} color="red" />
                                        
             
                    <IconButton  id="sidebarCollapse" className="btn  m-2"  onClick={editarUsuario}  icon={<Icon icon='edit2'  size="5x" />} color="blue" />
             
           </>   
     );
}
 
export default withRouter(Usuario);