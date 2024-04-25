import express from "express";
import morgan from "morgan";
import db from "./modules/db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./graphql";

const app = express();

app.use(morgan("dev"));

app.get("/", async (req, res) => {
  const submissions = await db.submission.findMany();
  res.json(submissions);
});

const startServer = async () => {
  const port = Number(process.env.PORT ?? 8080);
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { host: "0.0.0.0", port },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
