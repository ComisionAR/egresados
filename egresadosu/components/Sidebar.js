import React, {useState} from 'react';

import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client'
import useScript from 'react-script-hook';
import { Icon , IconButton} from 'rsuite';
import Cookies from 'universal-cookie';


const Sidebar = ({children}) => {
    const cookies = new Cookies();
    useScript({
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js" ,
        onload: () => console.log('Script loaded!'),
    });

    useScript({
        src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" ,
        onload: () => console.log('Script loaded!'),
    });
    useScript({
        src: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" ,
        onload: () => console.log('Script loaded!'),
    });
  

    const router = useRouter();
 
    const [isActive, setActive] = useState("false");
    const ToggleClass = () => {
      setActive(!isActive); 
     };
   
    
    
     const cerrarSesion = () => {
    
        cookies.remove('_tk__Access',"",{httpOnlyL:true, secure:true, path:'/'})
        router.push('/login');
    }
    


    return ( 
         <>
      
    <div className="wrapper">

        <nav id="sidebar" className={isActive ? "active" : null} >
            <div className="sidebar-header">
                <h3>Sistema Egresados</h3>
            </div>

            <ul className="list-unstyled components">
             
                <li className="active">
                <a href={"/usuarios" }>Usuarios</a>
                </li>
             
                <li className="active">
                    <a href={"/egresados"} >Egresados</a>
                </li>
                <li className="nav-item active">
                                <a className="nav-link" href={"/miPerfil"}>Mi Perfil</a>
                </li>
                           
              
             
                
            </ul>

            <ul className="list-unstyled CTAs">
                <li>
                    <a className="download"  onClick={() => cerrarSesion() }>Logout</a>
                </li>
             
            </ul>
        </nav>

  
        <div id="content">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    <IconButton id="sidebarCollapse"  icon={<Icon icon='align-left'  size="5x" />} className="btn "color="blue"  onClick={ToggleClass}/>
            

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href={"/usuarios"}>Usuarios</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href={"/egresados"}>Egresados</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href={"/miPerfil"}>Mi Perfil</a>
                            </li>
                           
                            <li className="nav-item">
                                 <IconButton icon={<Icon icon='arrow-circle-o-right'  size="5x" />}   onClick={() => cerrarSesion() } />

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

         {children}
   </div>
    </div>

         
         
          </>
     );
}
 
export default Sidebar;