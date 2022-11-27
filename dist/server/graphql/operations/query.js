"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const clientResolvers_1 = require("../resolvers/clientResolvers");
const projectResolvers_1 = require("../resolvers/projectResolvers");
const userResolvers_1 = require("../resolvers/userResolvers");
const AuthType_1 = __importDefault(require("../types/AuthType"));
const ClientType_1 = __importDefault(require("../types/ClientType"));
const ProjectType_1 = __importDefault(require("../types/ProjectType"));
const UserType_1 = __importDefault(require("../types/UserType"));
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        //login user
        loginUser: {
            type: AuthType_1.default,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve: async (parent, args) => await (0, userResolvers_1.loginUser)(parent, args),
        },
        //get single user
        getSingleUser: {
            type: UserType_1.default,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve: async (parent, args, req) => await (0, userResolvers_1.getSingleUser)(parent, args, req),
        },
        //get single client
        getSingleClient: {
            type: ClientType_1.default,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: async (parent, args, req) => await (0, clientResolvers_1.getSingleClient)(parent, args, req),
        },
        //get all clients
        getAllClient: {
            type: new graphql_1.GraphQLList(ClientType_1.default),
            resolve: async (parent, arg, req) => await (0, clientResolvers_1.getAllClients)(parent, arg, req),
        },
        //get single project
        getSingleProject: {
            type: ProjectType_1.default,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve: async (parent, args, req) => await (0, projectResolvers_1.getSingleProject)(parent, args, req),
        },
        //get all projects
        getAllProject: {
            type: new graphql_1.GraphQLList(ProjectType_1.default),
            resolve: async (parent, args, req) => await (0, projectResolvers_1.getAllProjects)(parent, args, req)
        }
    }),
});
exports.default = RootQuery;
