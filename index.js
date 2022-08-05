// https://www.geeksforgeeks.org/how-to-have-path-alias-in-node-js/
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
require('module-alias/register')
const { getCommand, registerCommand } = require('@cmdcore/CommandManager.js');

function registerCommands() {
    const requireDir = require("require-dir");
    const { _moduleAliases } = require('./package.json');

    Object.values(requireDir(_moduleAliases['@command']))
        .forEach(command => registerCommand(command));
}

registerCommands();

// node index.js -x -y
const argv = process.argv.slice(1);

getCommand(argv).execute();