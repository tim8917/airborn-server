const fakeDb = {
    fly: {
        id: 'fly',
        name: 'Fly',
    },
    land: {
        id: 'land',
        name: 'Land',
    },
};

const resolvers = {
    commands: (_, context) => {
        return Object.values(fakeDb);
    },
    command: ({id}, context) => {
        return fakeDb[id];
    },
};

module.exports = resolvers;
