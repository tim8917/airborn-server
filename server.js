const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');
const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws');
const {execute, subscribe} = require('graphql');
const {GRAPHQL_PATHNAME, WEBSOCKETS_PATHNAME} = require('./constants');
const {resolvers, pubsub} = require('./resolvers');
const cors = require('cors');
const {ClientsManager} = require('./lib/clients-manager');

const app = express();
const clientsManager = new ClientsManager(pubsub);

// GraphQL
app.use(GRAPHQL_PATHNAME, graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

// pure HTTP
app.use(cors());
app.use(express.json());

app.use(`/api/http/command`, (req, res) => {
    const {command} = req.body;

    clientsManager.publishCommand(command);

    res.send({command});
});

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
