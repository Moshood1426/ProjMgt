"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ClientType_1 = __importDefault(require("./ClientType"));
const UserType_1 = __importDefault(require("./UserType"));
const userResolvers_1 = require("../resolvers/userResolvers");
const clientResolvers_1 = require("../resolvers/clientResolvers");
const ProjectType = new graphql_1.GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        client: {
            type: ClientType_1.default,
            resolve: async (parent, args, req) => await (0, clientResolvers_1.getSingleClient)(parent, args, req),
        },
        user: {
            type: UserType_1.default,
            resolve: async (parent, args, req) => await (0, userResolvers_1.getSingleUser)(parent, args, req),
        },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
    }),
});
exports.default = ProjectType;
