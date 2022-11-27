import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { getSingleClient, getAllClients } from "../resolvers/clientResolvers";
import { getAllProjects, getSingleProject } from "../resolvers/projectResolvers";
import { getSingleUser, loginUser } from "../resolvers/userResolvers";
import AuthType from "../types/AuthType";
import ClientType from "../types/ClientType";
import ProjectType from "../types/ProjectType";
import UserType from "../types/UserType";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    //login user
    loginUser: {
      type: AuthType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => await loginUser(parent, args),
    },

    //get single user
    getSingleUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, req) =>
        await getSingleUser(parent, args, req),
    },

    //get single client
    getSingleClient: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args, req) =>
        await getSingleClient(parent, args, req),
    },

    //get all clients
    getAllClient: {
      type: new GraphQLList(ClientType),
      resolve: async (parent, arg, req) =>
        await getAllClients(parent, arg, req),
    },

    //get single project
    getSingleProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (parent, args, req) =>
        await getSingleProject(parent, args, req),
    },

    //get all projects
    getAllProject: {
        type: new GraphQLList(ProjectType),
        resolve: async (parent, args, req) => await getAllProjects(parent, args, req)
    }
  }),
});

export default RootQuery;
