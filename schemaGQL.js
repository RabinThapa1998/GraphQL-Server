import { ApolloServer, gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [Quote]
    quote(by: ID!): [Quote]
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type Quote {
    name: String
    by: ID
  }
  type Mutation {
    signUpUser(userNew: UserInput!): User
    signInUser(userSignin: UserSignInInput!): Token
  }
  type Token {
    token: String
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSignInInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
