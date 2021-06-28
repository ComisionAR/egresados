

const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const conectaDB = require("./config/db")
const jwt = require("jsonwebtoken");
var helmet = require('helmet');
var session = require('cookie-session');
var hpp = require('hpp');
var bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize');
require("dotenv").config({ path: "variables.env" });
var cookieParser = require('cookie-parser')
var csrf = require('csurf')
//Conectar la base de datos
conectaDB();




const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  context: ({req})=>{ 

    const token = req.headers['authorization'] || ""; 
    if(token){
      try {

       
        const usuario = jwt.verify(token.replace("Bearer ", ""), process.env.secretKey);

        //console.log(usuario)

        return {
          usuario
        }

      } catch (error) {
        console.log("Hubo un error");
        console.log(error);
      }
    }
  }
});

const app = express();
app.disable('x-powered-by');

app.use(helmet());





app.use(session({
  name: 'session',
  keys: [
  process.env.COOKIE_KEY1,
  process.env.COOKIE_KEY2
  ],
  cookie: {httpOnly: true, secure: true}
  }))

  app.use(cookieParser())

app.use(mongoSanitize());

// Or, to replace prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);
server.applyMiddleware({app});
app.listen({port: process.env.PORT || 4000, },()=> 
console.log(`Server is Runnig.. http://localhost:4000${server.graphqlPath}`));