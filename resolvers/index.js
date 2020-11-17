const {PubSub} = require('graphql-subscriptions');

const COMMAND_SUBMITTED = 'COMMAND_SUBMITTED';

const pubsub = new PubSub();

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
