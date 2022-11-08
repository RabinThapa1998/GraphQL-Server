import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { quotes, users } from "./fakedb.js";

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    quotes: [Quote]
    quote(by: ID!): [Quote]
  }
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type Quote {
    name: String
    by: ID
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((item) => item.id === args.id),
    quotes: () => quotes,
    quote: (_, args) => quotes.filter((item) => item.by === args.by),
  },
  User: {
    quotes: (ur) => quotes.filter((q) => q.by === ur.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
