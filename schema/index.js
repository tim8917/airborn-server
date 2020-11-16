const {buildSchema, GraphQLObjectType, GraphQLID, GraphQLString} = require('graphql');

const index = buildSchema(`
    type Command {
        id: ID!
        name: String
    }
    
    type Query {
        commands: [Command]
        command(id: ID!): Command 
    }
`);

module.exports = index;
