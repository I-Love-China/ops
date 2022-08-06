const Command = require("@cmdcore/Command.js");
const cmdManager = require('@cmdcore/CommandManager.js');

const printHeader = () => {
    console.log(`Usage: node index.js <command> [options]`);
}

const printCommand = command => {
    const cmd = cmdManager.getCommand(['_', command]);
    process.stdout.write(`                     ${cmd.usage()}\n`);
}

class HelpCommand extends Command {
    constructor(commandArg) {
        super("help", commandArg);
    }

    execute() {
        printHeader();

        // print command usage
        const commands = this.commandArg.getOption('c') || [];
        if (!commands || !commands.length) {
            commands.push(...cmdManager.getAllCommands());
        }

        for (const command of commands) {
            printCommand(command);
        }
    }

    usage() {
        return `help -c cmd1 cmd2`;
    }
}

module.exports = HelpCommand;