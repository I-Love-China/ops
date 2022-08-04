import CommandArg from "./CommandArg";

const { default: Command } = require("./Command");

class NotFoundCommand extends Command {
    constructor(requestCommand = '', availableCommands = []) {
        super('NotFoundCommand', null);

        this.requestCommand = requestCommand;
        this.availableCommands = availableCommands;
    }

    execute() {
        console.log(`command '${this.requestCommand}' not found, available commands: ${this.availableCommands} `);
    }
}

export default NotFoundCommand;