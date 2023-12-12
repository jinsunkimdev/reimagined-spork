import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import {
  mergeResolvers,
  mergeTypeDefs,
} from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const loadedTypes = loadFilesSync(
  path.join(__dirname, "./users/**/*.typeDefs.js")
);
const loadedResolvers = loadFilesSync(
  path.join(__dirname, "./users/**/*.resolvers.js")
);
export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);