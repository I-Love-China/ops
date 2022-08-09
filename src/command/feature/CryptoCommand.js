const Command = require("@cmdcore/Command.js");
const AES = require('crypto-js/aes');
const CryptoJS = require('crypto-js');
// const readline = require('readline-sync');

const commandName = "crypt";

class CryptoCommand extends Command {
    constructor(commandArg) {
        super(commandName, commandArg);
    }

    execute() {
        // const crypt = readline.question(`crypt[e|d]:`),
        //     password = readline.question(`cipher:`, { hideEchoBack: true }),
        //     input = readline.question(`input:`);
        const [crypt, password, input] = this.commandArg.getOptions('c', 'p', 'i');
        if ('e' === crypt) {
            console.log(AES.encrypt(input, password).toString());
            return;
        }
        console.log(AES.decrypt(input, password).toString(CryptoJS.enc.Utf8));
    }

    usage() {
        return `${commandName} -c [e|d] -p password -i input`
    }
}

module.exports = CryptoCommand;