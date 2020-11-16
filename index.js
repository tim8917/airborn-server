const server = require('./server');
const {GRAPHQL_PATHNAME, WEBSOCKETS_PATHNAME} = require('./constants');

const SERVER_PORT = 4000;

server.listen(4000, () => {
    console.log(`🚀 GRAPHQL server started at http://localhost:${SERVER_PORT}${GRAPHQL_PATHNAME}`);
    console.log(`🚀 WEBSOCKETS server started at http://localhost:${SERVER_PORT}${WEBSOCKETS_PATHNAME}`);
});
