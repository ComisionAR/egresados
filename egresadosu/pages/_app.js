import {ApolloProvider} from "@apollo/client";
import client from "../config/apollo";
import { withSecureHeaders } from "next-secure-headers";
import "../styles/styles.css";

import "rsuite/dist/styles/rsuite-default.css";
import Head from "next/head";


const MyApp = ({Component, pageProps}) =>{


    return (
        <>
            <Head>
                <title>Sistema Egresados</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"/>
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
            
                <link href="  https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous"/>



            </Head>
  
        <ApolloProvider client={client}>        
        
          <Component {...pageProps  }   />


        </ApolloProvider>
 
        </>
        
    )
}

export default (MyApp);

/*
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;

*/