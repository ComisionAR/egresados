import React,{useEffect, useState} from 'react'; 
import Layout from '../components/Layout';
import ExcelDownload from '../components/ExcelDownload';

import { useRouter } from 'next/router';

import readXlsxFile from 'read-excel-file'
import { Loader } from 'rsuite';
import { gql, useQuery, useMutation } from '@apollo/client'
import Link from 'next/link';
import Egresado from '../components/Egresado'; 
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { withSecureHeaders } from "next-secure-headers";
import { Icon , IconButton, Notification, Table} from 'rsuite';
import {schema} from '../components/SchemaExcel'
const { Column, HeaderCell, Cell, Pagination } = Table;
const OBTENER_EGRESADOS = gql`
query obtenerEgresados($estado: Estado!){
    obtenerEgresados(estado:$estado){
      id
      nombre
      apellido 
      cedula
  

    }
  }
`;

const CARGA_EXCEL= gql`
mutation insertarCargaExcel($input: egresadoExcelInput) {
    insertarCargaExcel(input: $input) {
            id,
    cedula,
    nombre,
    apellido,
    telefonoPersonal,
    fecha_Nacimiento,
    annioIngreso,
    annioEgreso,
    carrera,
    telefonoTrabajo,
    labora,
    trabajoActual,
    correoUNA,
    correoPersonal,
    correoTrabajo,
     estado,
    direccion,
    creado
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


  const Egresados = () =>{
    const router = useRouter();

  const { data, loading, error,startPolling, stopPolling } = useQuery(OBTENER_EGRESADOS, { variables: { estado: 'ACTIVO' }     });
  const [insertarCarga, {loading: carga}] = useMutation(CARGA_EXCEL); 
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

    if(loading ) return    (<Loader backdrop content="Cargando..." vertical size="lg" />);
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
  

    const ReadFile =(e)=>{
      
        try{
          var files = e.target.files, f = files[0];
          const isXls = (f.type === '.csv' || f.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || f.type === 'application/vnd.ms-excel')
          if(isXls ){
              readXlsxFile(f, { schema }).then((rows) => {
                  if(rows.errors.length === 0){
                    
                      GuardarCarga(rows.rows); 
                  }else{
                      
                      Notification['error']({
                          title: 'Error',
                          duration: 20000,
                          description: 'Excel no válido, verifique que contenga la información necesaria.'
                      })
                  }       
                })
          }else{
              Notification['error']({
                  title: 'Error',
                  duration: 20000,
                  description: 'Archivo no válido, solo se permite archivos de tipo excel, con menos de 300 filas'
              })
          }
        }catch(error){
            Notification['error']({
                title: 'Error',
                duration: 20000,
                description: 'Archivo no aceptado'
            })
        }
       
     


          
  }

  const getDataExcel= (ExcelData)=>{

    for(let i = 0; i < ExcelData.length; i++){
        ExcelData[i].cedula =  ExcelData[i].cedula.toString();
        ExcelData[i].nombre =  ExcelData[i].nombre.toString();
        ExcelData[i].apellido =  ExcelData[i].apellido.toString();
        ExcelData[i].telefonoPersonal =  ExcelData[i].telefonoPersonal.toString();
        ExcelData[i].fecha_Nacimiento =  ExcelData[i].fecha_Nacimiento.toString();
        ExcelData[i].annioIngreso =  ExcelData[i].annioIngreso.toString();
        ExcelData[i].annioEgreso =  ExcelData[i].annioEgreso.toString();
        ExcelData[i].carrera =  ExcelData[i].carrera.toString();
        ExcelData[i].telefonoTrabajo =  ExcelData[i].telefonoTrabajo.toString();
        ExcelData[i].labora =  ExcelData[i].labora.toString();
        ExcelData[i].trabajoActual =  ExcelData[i].trabajoActual.toString();
        ExcelData[i].correoUNA =  ExcelData[i].correoUNA.toString();
        ExcelData[i].correoPersonal =  ExcelData[i].correoPersonal.toString();
        ExcelData[i].direccion =  ExcelData[i].direccion.toString();
        ExcelData[i].estado='ACTIVO';
    }
    return ExcelData
}
    
    const getData = () => {
        try {
            return data.obtenerEgresados.filter((v, i) => {
                if (filter !== "") {
                    return getFilteredByKey(v, filter)
                }
                const start = displayLength * (page - 1);
                const end = start + displayLength;
                return i >= start && i < end;
            })
        } catch (error) {
            return null ; 
        }
      }
      const getFilteredByKey = (key, value) => {
        const val = key.cedula.toLowerCase();
        const val2 = value.toLowerCase();
        if (val.includes(val2)) {
            return key
        }
        return null;
      }

    const GuardarCarga= async (ExcelData) =>{
        
        const dataT = getDataExcel(ExcelData)
     
        try{
            const {data,error} = await insertarCarga({
                variables:{
                    input:{
                         data:dataT
                    }
                }
            }) 
            if(data){
           

               const {insertarCargaExcel} = data; 
               setExcelData(insertarCargaExcel);
             

                if(insertarCargaExcel.length==0){
                    Notification['success']({
                        title: 'Genial',
                        duration: 5000,
                        description:'Felicitaciones, cargas de egresados creadas con éxito.' 
                    })
                }else{
                    if((dataT.length -  insertarCargaExcel.length)  > 0){
                        Notification['success']({
                            title: 'Genial',
                            duration: 12000,
                            description:'Felicitaciones, se cargaron ' + (dataT.length -  insertarCargaExcel.length) + ' egresados de ' + dataT.length + ', descargue el excel y compruebe la información de los faltantes.'
                        })
                   
                     }
                         
                     
                        Notification['error']({
                            title: 'Error',
                            duration: 10000,
                            description: 'Descargue el excel para verificar los datos.'
                       }) 
                }
            }else{
                Notification['error']({
                    title: 'Error',
                    duration: 10000,
                    description: 'Ocurrió un error el subir los egresados, compruebe su información.'
                })
            }

        }catch(error){
            if (error) {
              
                Notification['error']({
                    title: 'Error',
                    duration: 10000,
                    description: 'Ocurrió un error el subir los egresados, compruebe su información.'
                })
        
              }

        } 
 }


   const dataEg=  getData();
    return(

        <div>
        <Layout>
          {
              !loading?   
              <>
              <h1 className="text-2xl text-gray-800 font-light">Egresados</h1>
        <div className="form-group">
      
        <div className="form-row">

        <div className="form-group col-md-5">
            <label><strong>Filtrar por cédula</strong></label>
            <div className="input-group">

                <input id="filter" className="form-control" type="text" onChange={(e) => { if (e.target.value === "") setFilter(e.target.value); }} />

                <div className="input-group-append">
                <button type="button" id="sidebarCollapse" className="btn " onClick={() => setFilter(document.getElementById('filter').value)} >
                    <IconButton icon={<Icon icon='search'  size="3x" />} color="blue" />
                         
                    </button>
                
                </div>
            </div>
        </div>

        </div>
        <div className="mt-3">
        <Table height={400}  data = {dataEg} id= "table"  wordWrap={true}>
                    
                           
                                  
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
                                <Egresado key= {rowData.id}  egresado= {rowData}/>
                               );
                           }}


                       </Cell>

                       </Column>               

               </Table>










        <Pagination
                            first={false}
                            last={false}
                            next={false}
                            prev={false}
                            showInfo={false}
                            showLengthMenu={false}
                            activePage={page}
                            displayLength={displayLength}
                            total={data.obtenerEgresados ?  data.obtenerEgresados.length : 0}
                            onChangePage={handleChangePage}
                            onChangeLength={handleChangeLength}
                        />

        </div>


        </div>


     <div className="mt-2"> 

      <Link href="/nuevoEgresado" >
          
          <IconButton icon={<Icon icon='plus-square'  size="5x" />} color="green" />
        
          </Link>
 
            
          <IconButton className="mr-2 ml-2 " icon={<Icon icon="file-excel-o" />} placement="left"  color="green" >
            
            <label  htmlFor="my-file-selector"  >
            Excel
                      <input id="my-file-selector" type="file" style={{display:"none"}} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(event)=> { 
                      ReadFile(event) 
              }} />
    
                     </label>
         </IconButton>  
         {
              excelData ?  <ExcelDownload data={excelData} setExcelData={setExcelData}  name={' Descargar Excel'} color="red" filename="CargaEgresadosErrores"/>   :null
          }

     </div>
    
              </>
              
              
              
              : ''


          }
        </Layout>
      </div>



    )
  }
  export default withSecureHeaders()(Egresados)