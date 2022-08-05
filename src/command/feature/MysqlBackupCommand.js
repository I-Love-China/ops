const Command = require("@cmdcore/Command.js");
const mysqldump = require('mysqldump');
const FS  = require('@supercharge/fs');

function dumpdb(host, user, password, database, backupDir) {
    const dumpToFile = `${backupDir}/${database}.sql`;
    FS.ensureDir(backupDir).then(() => {
        mysqldump({
            connection: { host, user, password, database },
            dumpToFile,
            compressFile: false
        });
    });
}

class MysqlBackupCommand extends Command {
    constructor(commandArg) {
        super("mysql-backup", commandArg);
    }

    execute() {
        const [host, user, password, database] = [
            this.commandArg.getOption("h"),
            this.commandArg.getOption("u"),
            this.commandArg.getOption("p"),
            this.commandArg.getOption("D"),
        ];

        const timestamp = new Date().toISOString().replace(/[^\d]/g, '');
        const backupDir = `output/mysql-backup/${timestamp}`;

        dumpdb(host, user, password, database, backupDir);
    }
}

module.exports = MysqlBackupCommand;