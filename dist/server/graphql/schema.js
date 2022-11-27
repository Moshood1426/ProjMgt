"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("./operations/query"));
const mutation_1 = __importDefault(require("./operations/mutation"));
const graphql_1 = require("graphql");
exports.default = new graphql_1.GraphQLSchema({
    query: query_1.default,
    mutation: mutation_1.default,
});
