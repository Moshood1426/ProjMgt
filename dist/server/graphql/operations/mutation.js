"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const clientResolvers_1 = require("../resolvers/clientResolvers");
const userResolvers_1 = require("../resolvers/userResolvers");
const AuthType_1 = __importDefault(require("../types/AuthType"));
const ClientType_1 = __importDefault(require("../types/ClientType"));
const ProjectType_1 = __importDefault(require("../types/ProjectType"));
const projectResolvers_1 = require("../resolvers/projectResolvers");
const mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        //auth mutation
        register: {
            type: AuthType_1.default,
            args: {
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve: async (parent, args) => await (0, userResolvers_1.registerUser)(parent, args),
        },
        //client mutation
        addClient: {
            type: ClientType_1.default,
            args: {
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                phone: { type: graphql_1.GraphQLString },
            },
            resolve: async (parent, args, req) => await (0, clientResolvers_1.createClient)(parent, args, req),
        },
        //create Project
        createProject: {
            type: ProjectType_1.default,
            args: {
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                status: { type: graphql_1.GraphQLString },
                clientId: { type: graphql_1.GraphQLID },
            },
            resolve: async (parent, args, req) => await (0, projectResolvers_1.createProject)(parent, args, req),
        },
        deleteProject: {
            type: ProjectType_1.default,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve: async (parent, args, req) => await (0, projectResolvers_1.deleteProject)(parent, args, req),
        },
    }),
});
exports.default = mutation;
