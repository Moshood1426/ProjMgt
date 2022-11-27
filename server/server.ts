import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import connectDB from "./config/connectDB";
import colors from "colors";
import cors from "cors";
import authenticateUser from "./middleware/authUser";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

//@ts-ignore
app.use(authenticateUser)

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development" ? true : false,
  })
);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
