class Command {
    constructor(commandName, commandArg) {
        this.commandName = commandName;
        this.commandArg = commandArg;
    }

    /**
     * 
     * @returns 命令名
     */
    getCommandName() {
        return this.commandName;
    }

    execute() {

    }

    /**
     * 使用说明文档
     */
    usage() {

    }
}

module.exports = Command;