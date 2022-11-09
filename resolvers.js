import { quotes, users } from "./fakedb.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const User = mongoose.model("User");
const resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((item) => item._id === args._id),
    quotes: () => quotes,
    quote: (_, args) => quotes.filter((item) => item.by === args.by),
  },
  User: {
    quotes: (ur) => quotes.filter((q) => q.by === ur._id),
  },
  Mutation: {
    signUpUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists");
      }
      const hashedpassword = await bcrypt.hash(userNew.password, 12);
      const newUser = new User({
        ...userNew,
        password: hashedpassword,
      });
      return await newUser.save();
    },
  },
};

export default resolvers;
