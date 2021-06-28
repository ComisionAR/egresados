import React from 'react'; 
import ReactExport from "react-export-excel";
import {IconButton, Icon} from "rsuite";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelDownload = ({props, data , setExcelData, name, color, filename})=>{



    return(
       
            <ExcelFile element=
            {
                <IconButton onClick={()=> setExcelData(null)} className="mr-2 ml-2"  icon={<Icon icon="fas fa-arrow-circle-down" color="white"  size="5x"/>} placement="left"  color={color} >
                    
                     {name}
                </IconButton>  

            } filename={filename}> 
                <ExcelSheet data={data} name="EgresadosErrores">
                    <ExcelColumn label="Cédula" value="cedula"/>
                    <ExcelColumn label="Nombre" value="nombre"/>
                    <ExcelColumn label="Apellidos" value="apellido"/>
                    <ExcelColumn label="Telefono Personal" value="telefonoPersonal"/>
                    <ExcelColumn label="Fecha Nacimiento" value="fecha_Nacimiento"/>
                    <ExcelColumn label="Año Ingreso" value="annioIngreso"/>
                    <ExcelColumn label="Annio Egreso" value="annioEgreso"/>
                    <ExcelColumn label="Carrera" value="carrera"/>                   
                    <ExcelColumn label="Telefono Trabajo" value="telefonoTrabajo"/>
                    <ExcelColumn label="Labora" value="labora"/>
                    <ExcelColumn label="Trabajo Actual" value="trabajoActual"/>
                    <ExcelColumn label="Correo Institucional" value="correoUNA"/>
                    <ExcelColumn label="Correo Personal" value="correoPersonal"/>
                    <ExcelColumn label="Correo Trabajo" value="correoTrabajo"/>
                    <ExcelColumn label="Dirección" value="direccion"/>

                    
                    
                </ExcelSheet>
            
            </ExcelFile>
      
    )
}

export default ExcelDownload; 