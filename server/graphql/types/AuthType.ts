import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const AuthType = new GraphQLObjectType({
    name: 'Auth',
    fields: () => ({
        id: { type: GraphQLID },
        token: { type: GraphQLString },
    })
})

export default AuthType