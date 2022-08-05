const CommandArg = require("@cmdcore/CommandArg.js");
const NotFoundCommand = require("@command/NotFoundCommand.js");

const commandMap = new Map();

/**
 * 
 * @param {Command 类} cmdClz 
 */
exports.registerCommand = (cmdClz) => {
    const cmd = new cmdClz(null);
    commandMap.set(cmd.getCommandName(), cmdClz);
}

/**
 * 
 * @param {命令行参数字符串，不包含程序名} totalCommandOption 
 * @returns 
 */
exports.getCommand = (argv = []) => {
    const commandName = argv[1];

    // 命令未找到
    if (!commandMap.has(commandName)) {
        return new NotFoundCommand(commandName, this.getAllCommands());
    }

    // 找到已注册的命令
    const cmdClz = commandMap.get(commandName);
    return new cmdClz(new CommandArg(argv.slice(2).join(' ')));
}

/**
 * 
 * @returns 获取所有注册的命令名
 */
exports.getAllCommands = () => {
    return commandMap.keys();
}