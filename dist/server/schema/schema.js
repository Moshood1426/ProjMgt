"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Projects_1 = __importDefault(require("../model/Projects"));
const Client_1 = __importDefault(require("../model/Client"));
//Project Type
const ProjectType = new graphql_1.GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client_1.default.findById(parent.clientId);
            },
        },
    }),
});
//Client Type
const ClientType = new graphql_1.GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        client: {
            type: ClientType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return Client_1.default.findById(args.id);
            },
        },
        clients: {
            type: ClientType,
            resolve(parent, args) {
                return Client_1.default.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return Projects_1.default.findById(args.id);
            },
        },
        projects: {
            type: ProjectType,
            resolve(parent, args) {
                return Projects_1.default.find();
            },
        },
    },
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                phone: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client_1.default({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            },
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve(parent, args) {
                return Client_1.default.findByIdAndRemove(args.id);
            },
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                description: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                status: {
                    type: new graphql_1.GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            new: { value: "Not Started" },
                            progress: { value: "In Progress" },
                            completed: { value: "Completed" },
                        },
                    }),
                    defaultValue: "Not Started",
                },
                clientId: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                const project = new Projects_1.default({
                    name: args.name,
                    description: args.description,
                    status: args.started,
                    clientId: args.clientId,
                });
                return project.save();
            },
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) }
            },
            resolve(parent, args) {
                return Projects_1.default.findByIdAndRemove(args.id);
            }
        }
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation,
});
