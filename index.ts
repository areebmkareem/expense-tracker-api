require('./src/db/mongoose');
const {ApolloServer, gql} = require('apollo-server');
import {createUser} from './src/routes/user';
import validateToken from './src/controllers/validateToken';
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type user {
    _id: String!
    email: String!
  }
  type userLoginResponse {
    token: String!
    user: user!
  }
  type accountGroup {
    _id: ID!
    title: String!
    createdBy: ID!
  }

  type Query {
    books: [Book]
  }
  type Mutation {
    signUpWithEmailAndPassword(email: String!, password: String!): userLoginResponse!
    signInWithEmailAndPassword(email: String!, password: String!): Book
    createAccountGroup(title: String!): accountGroup!
  }
`;

type signUp = {
  email?: String;
  password?: String;
};

const signInWithEmailAndPassword = (_: any, {email, password}: signUp) => {};

const resolvers = {
  Query: {},
  Mutation: {
    signUpWithEmailAndPassword: createUser,
    signInWithEmailAndPassword,
    createAccountGroup: (
      _: any,
      payload: any,

      asd: any,
    ) => {},
  },
};

type contextArguments = {
  req: {
    headers: {
      authorization?: string;
    };
  };
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}: contextArguments) => {
    const hasToken = req.headers.authorization;
    return await validateToken(hasToken);
  },
});

server.listen().then(({url}: {url: number}) => {});
