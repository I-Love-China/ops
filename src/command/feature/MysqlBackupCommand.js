const Command = require("@cmdcore/Command.js");
const mysqldump = require('mysqldump');

class MysqlBackupCommand extends Command {
    constructor(commandArg) {
        super("mysql-backup", commandArg);
    }

    execute() {
        const [host, user, password, database] = [
            this.commandArg.getOption("h"),
            this.commandArg.getOption("u"),
            this.commandArg.getOption("p"),
            this.commandArg.getOption("D")
        ];

        mysqldump({
            connection: {
                host,
                user,
                password,
                database,
            },
            dumpToFile: './dump.sql',
            compressFile: false,
        });
    }
}

module.exports = MysqlBackupCommand;