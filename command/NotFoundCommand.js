import Command from "./Command.js";

class NotFoundCommand extends Command {
    constructor(requestCommand = '', availableCommands = []) {
        super('NotFoundCommand', null);

        this.requestCommand = requestCommand;
        this.availableCommands = availableCommands;
    }

    execute() {
        console.log(`command '${this.requestCommand}' not found, available commands: ${[...this.availableCommands].join(', ')} `);
    }
}

export default NotFoundCommand;