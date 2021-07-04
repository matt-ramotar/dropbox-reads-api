import { buildSchema as buildGraphQLSchema } from "type-graphql";
import UserResolver from "./api/users/resolvers/UserResolver";

export default async function buildSchema() {
  return await buildGraphQLSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: false
  });
}
