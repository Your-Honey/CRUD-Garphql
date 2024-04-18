// Resolvers define how to fetch the types defined in your schema.

import GraphQLJSON from "graphql-type-json";
import { GraphQLDateTime } from "graphql-iso-date";
import db from "../modules/db";

// This resolver retrieves books from the "books" array above.
const resolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  Query: {
    submissions: () => db.submission.findMany(),
  },
};

export default resolvers;
