require('./src/db/mongoose');
const { ApolloServer, gql } = require('apollo-server');
import {createUser} from "./src/routes/user"
const typeDefs = gql`

  type Book {
    title: String
    author: String
  }
  type user{
    email:String!
  }
  type userLoginResponse{
    token:String!
    user:user!
  }

  type Query {
    books: [Book]
  }
  type Mutation{
    signUpWithEmailAndPassword(email:String!,password:String!):userLoginResponse!
    signInWithEmailAndPassword(email:String!,password:String!):Book
  }
   
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];


type signUp= {
  email?:String,
  password?:String
}


const signInWithEmailAndPassword=(_:any, {email,password}:signUp )=>{
  console.log('email,password: ', email,password);
  return books[0]

}

const resolvers = {
  Query: {
    books: () => books,
   
  },
  Mutation: {
    signUpWithEmailAndPassword:createUser,
    signInWithEmailAndPassword
  }  
};



const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }:{url:number}) => {
  console.log(`🚀  Server ready at ${url}`);
});
