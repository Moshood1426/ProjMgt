import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

export default UserType