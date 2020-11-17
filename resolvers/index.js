const {ClientsManager} = require('../lib/clients-manager');
const {PubSub} = require('graphql-subscriptions');

const pubsub = new PubSub();
const clientsManager = new ClientsManager(pubsub);

const COMMAND_SUBMITTED = 'COMMAND_SUBMITTED';

const fakeDb = {
    commands: {
        fly: {
            id: 'fly',
            name: 'Fly',
        },
        land: {
            id: 'land',
            name: 'Land',
        },
    },
};

const resolvers = {
    commands: (_, context) => {
        return Object.values(fakeDb.commands);
    },
    command: ({id}, context) => {
        return fakeDb.commands[id];
    },
    sendCommand: ({command}, context) => {
        clientsManager.publishCommand(command);
        return command;
    },
    commandGiven: () => pubsub.asyncIterator(COMMAND_SUBMITTED),
    // Subscription: {
    //     commandGiven: {
    //         subscribe: () => pubsub.asyncIterator(COMMAND_SUBMITTED)
    //     },
    // },
};

module.exports = {
    resolvers,
    pubsub
};
