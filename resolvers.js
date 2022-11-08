import { quotes, users } from "./fakedb.js";

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

export default resolvers;
