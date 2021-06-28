import React from 'react'
import {ApolloClient, createHttpLink, InMemoryCache,ApolloLink } from "@apollo/client";
import fetch from "node-fetch";
import { setContext} from "apollo-link-context";
import { onError } from 'apollo-link-error'
import Cookies from 'universal-cookie';
import { useCookies } from "react-cookie";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log("Algo salio mal"))
})


const httpLink = createHttpLink({
        // uri: "https://egresadosapi.herokuapp.com/graphql",
        uri: "  http://localhost:4000/graphql",

      
    fetch, credentials: 'same-origin'
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
const authLink = setContext((_, { headers }) =>{
    const cookies = new Cookies();
    const csrfToken = getCookie('XSRF-TOKEN');
    const token = cookies.get('_tk__Access')


    return {
        headers: {
            ...headers,
            authorization: token ? "Bearer "+token : "",
            'x-csrf-token': csrfToken ? csrfToken : "fbgfsdfsdfgbf",
        }
    }
});


const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link:ApolloLink.from([errorLink, authLink, httpLink])
});


export default client;





