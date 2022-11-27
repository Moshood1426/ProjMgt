import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import ClientType from "./ClientType";
import UserType from "./UserType";
import { getSingleUser } from "../resolvers/userResolvers";
import { getSingleClient } from "../resolvers/clientResolvers";

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: async (parent, args, req) =>
        await getSingleClient(parent, args, req),
    },
    user: {
      type: UserType,
      resolve: async (parent, args, req) =>
        await getSingleUser(parent, args, req),
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

export default ProjectType;
