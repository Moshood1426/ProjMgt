"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const AuthType = new graphql_1.GraphQLObjectType({
    name: 'Auth',
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        token: { type: graphql_1.GraphQLString },
    })
});
exports.default = AuthType;
