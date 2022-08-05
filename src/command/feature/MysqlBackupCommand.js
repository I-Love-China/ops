const Command = require("@cmdcore/Command.js");
const mysqldump = require('mysqldump');
const FS = require('@supercharge/fs');
const { getAllDatabses } = require('@util/MySqlUtil.js');

async function dumpdb(host, user, password, database, backupDir) {
    const dumpToFile = `${backupDir}/${database}.sql`;
    // https://futurestud.io/tutorials/node-js-how-to-create-a-directory-and-parents-if-needed
    await FS.ensureDir(backupDir);

    await mysqldump({
        connection: { host, user, password, database },
        dumpToFile,
        compressFile: false
    });
}

class MysqlBackupCommand extends Command {
    constructor(commandArg) {
        super("mysql-backup", commandArg);
    }

    async execute() {
        const [host, user, password, database, allDatabases] = [
            this.commandArg.getOption("h"),
            this.commandArg.getOption("u"),
            this.commandArg.getOption("p"),
            this.commandArg.getOption("D"),
            this.commandArg.getOption("all-databases"),
        ];

        const timestamp = new Date().toISOString().replace(/[^\d]/g, '');
        const backupDir = `output/mysql-backup/${timestamp}`;

        const databases = new Set([database].flat());
        if (allDatabases || !database) {
            const allDbs = await getAllDatabses({ host, user, password }) || [];
            allDbs.forEach(db => databases.add(db));
        }
        databases.delete(null);
        databases.delete("");

        let completedCount = 0;
        const total = databases.size;
        for (const db of databases) {
            console.log(`backing up ${db} --- ${++completedCount} / ${total}`)
            await dumpdb(host, user, password, db, backupDir);
        }
    }
}

module.exports = MysqlBackupCommand;