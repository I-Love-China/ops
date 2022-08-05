// https://www.geeksforgeeks.org/how-to-have-path-alias-in-node-js/
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
require('module-alias/register')
const { getCommand, registerCommand } = require('@command/CommandManager.js');
const MysqlBackupCommand = require('@command/MysqlBackupCommand.js');

registerCommand(MysqlBackupCommand);

// node index.js -x -y
const argv = process.argv.slice(1);

getCommand(argv).execute();