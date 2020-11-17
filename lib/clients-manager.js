const {getRandomInt} = require('../utils');

const COMMAND_SUBMITTED = 'COMMAND_SUBMITTED';

function ClientsManager(pubsub) {
    this.pubsub = pubsub;
    this.commandIntervalId = undefined;

    this.publishCommand = function (command) {
        if (command === 'land') {
            this.publishLandCommand();
        } else if (command === 'fly') {
            this.publishFlyCommand();
        } else {
            this.pubsub.publish(COMMAND_SUBMITTED, {commandGiven: {name: command}});
        }
    };

    this.publishLandCommand = function () {
        clearInterval(this.commandIntervalId);
        this.commandIntervalId = undefined;
        this.pubsub.publish(COMMAND_SUBMITTED, {commandGiven: {name: 'land'}});
    };

    this.publishFlyCommand = function () {
        if (!this.commandIntervalId) {
            this.commandIntervalId = setInterval(() => {
                this.pubsub.publish(
                    COMMAND_SUBMITTED,
                    {commandGiven: {name: 'fly', num: getRandomInt(100000)}}
                );
            }, 1000);
        }
    };

}

module.exports = {ClientsManager};
