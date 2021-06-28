import React,{useEffect} from 'react'

import Sidebar from '../components/Sidebar';
import { gql, useQuery } from '@apollo/client'
import Header from '../components/Header';
import { useRouter } from 'next/router';
import {Loader,Notification} from 'rsuite'
import createDOMPurify from "dompurify";


const Layout = ({children}) => {

   


    const router = useRouter();

    return ( 
        <>
         

            {router.pathname === '/login' || router.pathname === '/olvideContrasenna' ? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    <div>
                      
                        {children}

                       
                    </div>
                    
                </div>
            ) : (
            
                <div className="">
                <Header />
               
                <Sidebar children={children} />


             





                 </div>
        
                 
            )}
        </>
     );
}
 
export default Layout;