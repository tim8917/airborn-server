const server = require('./server');
const {SERVER_PORT, GRAPHQL_PATHNAME, WEBSOCKETS_PATHNAME} = require('./constants');

server.listen(SERVER_PORT, () => {
    console.log(`🚀 GRAPHQL server started at http://localhost:${SERVER_PORT}${GRAPHQL_PATHNAME}`);
    console.log(`🚀 WEBSOCKETS server started at http://localhost:${SERVER_PORT}${WEBSOCKETS_PATHNAME}`);
});
