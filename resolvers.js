import { quotes, users } from "./fakedb.js";
import { randomBytes } from "crypto";
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
  Mutation: {
    signUpUserDummy: (_, { userNew }) => {
      const id = randomBytes(5).toString("hex");
      users.push({
        id,
        ...userNew,
      });
      return users.find((item) => item.id === id);
    },
  },
};

export default resolvers;
