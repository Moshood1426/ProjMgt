"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const UserType_1 = __importDefault(require("./UserType"));
const userResolvers_1 = require("../resolvers/userResolvers");
const ClientType = new graphql_1.GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        user: {
            type: UserType_1.default,
            resolve: async (parent, args, req) => await (0, userResolvers_1.getSingleUser)(parent, args, req),
        },
    }),
});
exports.default = ClientType;
