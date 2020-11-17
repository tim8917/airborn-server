const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');
const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {execute, subscribe} = require('graphql');
const {GRAPHQL_PATHNAME, WEBSOCKETS_PATHNAME} = require('./constants');
const {resolvers} = require('./resolvers');
const cors = require('cors');

// Express setup
const app = express();
app.use(cors());
app.use(express.json());

// GraphQL
app.use(GRAPHQL_PATHNAME, graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

const server = createServer(app);

// WebSockets
const subscriptionServer = SubscriptionServer.create(
    {
        schema: schema,
        rootValue: resolvers,
        execute,
        subscribe,
    },
    {
        server: server,
        path: WEBSOCKETS_PATHNAME,
    },
);

module.exports = server;
