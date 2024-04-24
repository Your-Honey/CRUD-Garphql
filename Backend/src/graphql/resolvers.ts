// Resolvers define how to fetch the types defined in your schema.

import GraphQLJSON from "graphql-type-json";
import { GraphQLDateTime } from "graphql-iso-date";
import db, { getId } from "../modules/db";
import { GraphQLScalarType } from "graphql";

const resolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  Query: {
    submissions: () =>
      db.submission.findMany({ orderBy: { submittedAt: "asc" } }),
    submission: (_: any, { id }: { id: string }) =>
      db.submission.findFirst({
        where: { id },
      }),
  },
  Mutation: {
    createSubmission: async (
      _: any,
      { submittedAt, data }: { submittedAt: Date; data: GraphQLScalarType }
    ) => {
      const submission = await db.submission.create({
        data: {
          id: getId(),
          submittedAt,
          data,
        },
      });

      return submission;
    },
    deleteSubmission: async (_: any, { id }: { id: string }) => {
      const deleteSubmission = await db.submission.delete({ where: { id } });
      return !!deleteSubmission;
    },
    updateSubmission: async (
      _: any,
      args: { id: string; data: GraphQLScalarType }
    ) => {
      const updatedSubmission = await db.submission.update({
        where: { id: args.id },
        data: {
          ...args,
        },
      });
      return updatedSubmission;
    },
  },
};

export default resolvers;
