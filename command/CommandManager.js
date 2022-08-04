import CommandArg from "./CommandArg";
import NotFoundCommand from "./NotFoundCommand";

const commandMap = new Map();

/**
 * 
 * @param {Command 类} cmdClz 
 */
export function registerCommand(cmdClz) {
    cmd = new cmdClz(null);
    commandMap.set(cmd.getCommandName(), cmdClz);
}

/**
 * 
 * @param {命令行参数字符串，不包含程序名} totalCommandOption 
 * @returns 
 */
export function getCommand(totalCommandOption = '') {
    totalCommandOption = totalCommandOption.trim();
    const firstSpace = totalCommandOption.indexOf(/\s+/);

    const commandName = totalCommandOption.substring(0, firstSpace);

    // 命令未找到
    if (!commandMap.has(commandName)) {
        return new NotFoundCommand(commandName, getAllCommands());
    }

    // 找到已注册的命令
    const cmdClz = commandMap.get(commandName);
    return new cmdClz(new CommandArg(totalCommandOption.substring(firstSpace)));
}

/**
 * 
 * @returns 获取所有注册的命令名
 */
export function getAllCommands() {
    return commandMap.keys();
}