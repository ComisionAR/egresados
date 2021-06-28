import React,{useEffect,useState} from 'react'; 
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

import { Loader } from 'rsuite';
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link';
import Usuario from '../components/Usuario'; 

import { Icon , IconButton, Table, Notification} from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;
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

const OBTENER_USUARIOS = gql`
query obtenerUsuarios($estado: Estado!){
    obtenerUsuarios(estado:$estado){
      id
      nombre
      apellido 
      cedula
      email{
        email
      }
    }
  }
`;


const Usuarios = () =>{

    const router = useRouter();
    const { data, loading, error,startPolling, stopPolling } = useQuery(OBTENER_USUARIOS, { variables: { estado: 'ACTIVO' }     });
    const [excelData, setExcelData]= useState(null)
    const [page, setPage] = useState(1);
    const [displayLength, setDisplayLength] = useState(6);
    const [filter, setFilter] = useState('');
    useEffect(() => {
      startPolling(1000);
      return () => {
          stopPolling();
      }
  }, [startPolling, stopPolling])

  if(loading) return    (<Loader backdrop content="Cargando..." vertical size="lg" />);
  if (error ) {
      Notification['error']({
          title: 'Error',
          duration: 20000,
          description: 'Verifique su conexión'
      })
  }
    

    const handleChangePage = (dataKey) => {
      setPage(dataKey)
    }
    const handleChangeLength = (dataKey) => {
      setPage(1);
      setDisplayLength(dataKey);
    }
  
    const getData = () => {
      return data.obtenerUsuarios ? data.obtenerUsuarios.filter((v, i) => {
        if (filter !== "") {
            return getFilteredByKey(v, filter)
        }
        const start = displayLength * (page - 1);
        const end = start + displayLength;
        return i >= start && i < end;
    }) : null 
    }
    const getFilteredByKey = (key, value) => {
      const val = key.cedula.toLowerCase();
      const val2 = value.toLowerCase();
      if (val.includes(val2)) {
          return key
      }
      return null;
    }
    const dataEg= getData();

    return(
        <div>
        <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Usuarios</h1>
        <div className="form-group col-md-5">
            <label><strong>Filtrar por cédula</strong></label>
            <div className="input-group">

                <input id="filter" className="form-control" type="text" onChange={(e) => { if (e.target.value === "") setFilter(e.target.value); }} />

                <div className="input-group-append">
       
                    <IconButton  id="sidebarCollapse" className="btn " onClick={() => setFilter(document.getElementById('filter').value)} icon={<Icon icon='search'  size="3x" />} color="blue" />
             
                
                </div>
            </div>
        </div>

    <div className="mt-3">
        {
          dataEg ? (
            <Table height={400} data = {dataEg} id= "table"  wordWrap={true}>
                    
                           
                                  
            <Column width={400}>
                       <HeaderCell>Nombre</HeaderCell>
                       <Cell dataKey="nombre" />
           </Column>
           <Column width={500} >
                   <HeaderCell>Apellidos</HeaderCell>
                   <Cell dataKey="apellido" />
           </Column>          
           <Column width={300} >
                   <HeaderCell>Cédula</HeaderCell>
                   <Cell dataKey="cedula" />
           </Column>  
     
            <Column width={200} fixed="right">

               <HeaderCell>Acción</HeaderCell>
               <Cell> 
               {rowData => {
                       function handleAction() {
                       alert(`id:${rowData.id}`);
                       }
                       return (
                        <Usuario key= {rowData.id}  usuario= {rowData}/>
                       );
                   }}


               </Cell>

               </Column>               

       </Table>



          ):''
        }









        <Pagination
                            first={false}
                            last={false}
                            next={false}
                            prev={false}
                            showInfo={false}
                            showLengthMenu={false}
                            activePage={page}
                            displayLength={displayLength}
                            total={data.obtenerUsuarios?data.obtenerUsuarios.length : 0 }
                            onChangePage={handleChangePage}
                            onChangeLength={handleChangeLength}
                        />

        </div>

     <div className="mt-2"> 

      <Link href="/nuevoUsuario" >
          
          <IconButton icon={<Icon icon='plus-square'  size="5x" />} color="green" />
        
          </Link>


     </div>
    
        </Layout>
      </div>



    )


}


   
export default withSecureHeaders()(Usuarios); 