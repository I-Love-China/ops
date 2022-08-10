const Command = require("@cmdcore/Command.js");
const mysqldump = require('mysqldump');
const FS = require('@supercharge/fs');
const { getAllDatabses } = require('@util/MySqlUtil.js');
const { getReadableTimestamp } = require('@util/DateUtil.js');

async function dumpdb(host, user, password, database, backupDir) {
    const dumpToFile = `${backupDir}/${database}.sql`;

    try {
        await mysqldump({
            connection: { host, user, password, database },
            dump: {
                schema: {
                    table: {
                        dropIfExist: true
                    }
                },
                data: {
                    maxRowsPerInsertStatement: 10
                }
            },
            dumpToFile,
            compressFile: false
        });
    } catch (error) {
        // https://stackoverflow.com/questions/42453683/how-to-reject-in-async-await-syntax
        if ('ER_EMPTY_QUERY' === error.code) {
            return;
        }
        throw error;
    }
}

class MysqlBackupCommand extends Command {
    constructor(commandArg) {
        super("mysql-backup", commandArg);
    }

    async execute() {
        // 1. resolve options
        const [host, user, password, database, allDatabases] = [
            this.commandArg.getOption("h"),
            this.commandArg.getOption("u"),
            this.commandArg.getOption("p"),
            this.commandArg.getOption("D"),
            this.commandArg.getOption("all-databases"),
        ];

        // 2. prepare backup dir
        const backupDir = `output/mysql-backup/${getReadableTimestamp()}`;
        await FS.ensureDir(backupDir); // https://futurestud.io/tutorials/node-js-how-to-create-a-directory-and-parents-if-needed

        // 3. get databases which need to be backuped
        const databases = new Set([database].flat());
        if (allDatabases || !database) {
            const allDbs = await getAllDatabses({ host, user, password }) || [];
            allDbs.forEach(db => databases.add(db));
        }
        databases.delete(null);
        databases.delete("");

        // 4. backup one by one
        let completedCount = 0;
        const total = databases.size;
        for (const db of databases) {
            console.log(`backing up ${db} --- ${++completedCount} / ${total}`)
            await dumpdb(host, user, password, db, backupDir);
        }
    }

    usage() {
        return `mysql-backup -h host -u user -p password -D database -all-databases`;
    }
}

module.exports = MysqlBackupCommand;