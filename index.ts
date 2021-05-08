const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
  type Mutation{
    signUpWithEmailAndPassword(email:String!,password:String!):Book
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

const signUpWithEmailAndPassword=(_:any, {email,password}:signUp )=>{
  console.log('email,password: ', email,password);
  return books[0]

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
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword
  }  
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }:{url:number}) => {
  console.log(`🚀  Server ready at ${url}`);
});
