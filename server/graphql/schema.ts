import RootQuery from "./operations/query";
import mutation from "./operations/mutation";
import { GraphQLSchema } from "graphql";

export default new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
