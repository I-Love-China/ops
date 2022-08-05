import Command from "./Command.js";
import mysqldump from 'mysqldump';

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

export default MysqlBackupCommand;