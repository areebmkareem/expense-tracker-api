require('./src/db/mongoose');
const { ApolloServer, gql } = require('apollo-server');
import {createUser} from "./src/routes/user"
const typeDefs = gql`

  type Book {
    title: String
    author: String
  }
  type user{
    _id: String!,
    email: String!,
  }
  type userLoginResponse{
    token:String!
    user:user!
  }
  type accountGroup{
    _id: ID!,
    title: String!,
    createdBy:ID!,
  }

  type Query {
    books: [Book]
  }
  type Mutation{
    signUpWithEmailAndPassword(email:String!,password:String!):userLoginResponse!
    signInWithEmailAndPassword(email:String!,password:String!):Book
    createAccountGroup(title:String!):accountGroup!
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
    signInWithEmailAndPassword,
    createAccountGroup:(_:any,payload:any,asd:any)=>{
console.log(asd);
    }
  }  
};



const server = new ApolloServer({ typeDefs, resolvers, 
   context: async ({ req }:{req:Object}) => {

  // simple auth check on every request
  // const auth = req.headers && req.headers.authorization || '';
  // const email = Buffer.from(auth, 'base64').toString('ascii');
  // if (!isEmail.validate(email)) return { user: null };
  // // find a user by their email
  // const users = await store.users.findOrCreate({ where: { email } });
  // const user = users && users[0] || null;
  // return { user: { ...user.dataValues } };
  return {user:"Hello world"}
}, });

server.listen().then(({ url }:{url:number}) => {
  console.log(`🚀  Server ready at ${url}`);
});
