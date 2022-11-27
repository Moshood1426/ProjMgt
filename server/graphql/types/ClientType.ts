import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import UserType from "./UserType";
import { getSingleUser } from "../resolvers/userResolvers";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async (parent, args, req) =>
        await getSingleUser(parent, args, req),
    },
  }),
});

export default ClientType;
