import { ApolloServer } from "@apollo/server";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";
import { resolvers } from "./resolvers";

const typeDefs = loadFilesSync(path.join(__dirname, "./**/*.graphql"));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const createApolloServer = () => {
  return new ApolloServer({ schema });
};
