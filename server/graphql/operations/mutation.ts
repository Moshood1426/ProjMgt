import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { createClient } from "../resolvers/clientResolvers";
import { registerUser } from "../resolvers/userResolvers";
import AuthType from "../types/AuthType";
import ClientType from "../types/ClientType";
import ProjectType from "../types/ProjectType";
import UserType from "../types/UserType";
import { createProject, deleteProject } from "../resolvers/projectResolvers";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    //auth mutation
    register: {
      type: AuthType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => await registerUser(parent, args),
    },

    //client mutation
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: async (parent, args, req) =>
        await createClient(parent, args, req),
    },

    //create Project
    createProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        clientId: { type: GraphQLID },
      },
      resolve: async (parent, args, req) =>
        await createProject(parent, args, req),
    },

    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, req) =>
        await deleteProject(parent, args, req),
    },
  }),
});

export default mutation;
