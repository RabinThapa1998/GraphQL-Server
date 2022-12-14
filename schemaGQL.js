import { ApolloServer, gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    quote(by: ID!): [Quote]
  }
  type QuoteWithName {
    name: String
    by: IdName
  }
  type IdName {
    _id: ID
    firstName: String
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
    createQuote(name: String!): String
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
