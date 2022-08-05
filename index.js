import { getCommand, registerCommand } from './src/command/CommandManager.js';
import MysqlBackupCommand from './src/command/MysqlBackupCommand.js';

registerCommand(MysqlBackupCommand);

// node index.js -x -y
const argv = process.argv.slice(1);

getCommand(argv).execute();