import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { id }) => await User.findOne({ _id }),
    quotes: async () => await Quote.find({}),
    quote: async (_, { by }) => await Quote.find({ by }),
  },
  User: {
    quotes: (ur) => Quote.find({ by: ur._id }),
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
    signInUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User does not exist");
      }
      const isPasswordValid = await bcrypt.compare(
        userSignin.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid Email or Password");
      }
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );
      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in to create a quote");
      }
      const newQuote = await new Quote({
        name,
        by: userId,
      }).save();
      return "Quote created successfully";
    },
  },
};

export default resolvers;
