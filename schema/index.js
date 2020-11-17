const {buildSchema, GraphQLObjectType, GraphQLID, GraphQLString} = require('graphql');

const index = buildSchema(`
    type Command {
        id: ID!
        name: String
        num: Int
    }
    
    type Query {
        commands: [Command]
        command(id: ID!): Command 
    }
    
    type Subscription {
        commandGiven: Command    
    }
`);

module.exports = index;
