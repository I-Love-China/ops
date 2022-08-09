const CommandArg = require('@cmdcore/CommandArg.js');
const AES = require('crypto-js/aes');
const readline = require('readline-sync');
const CryptoJS = require('crypto-js');

let password = '';

getPassword = () => {
    if (password.length === 0) {
        password = readline.question(`Please type in your .env password. (My birthdate): `, { hideEchoBack: true });
    }
    return password;
}

decrypt = (encryptedVal) => {
    if (Array.isArray(encryptedVal)) {
        if (0 === encryptedVal.length) {
            return encryptedVal;
        }
        return encryptedVal.map(encrypted => decrypt(encrypted));
    }
    if (typeof encryptedVal !== 'string' && !(encryptedVal instanceof String)) {
        return encryptedVal;
    }
    if (null == encryptedVal || 0 === encryptedVal.length || !encryptedVal.startsWith('ENC(') || !encryptedVal.endsWith(')')) {
        return encryptedVal;
    }

    return AES.decrypt(encryptedVal.substring(4, encryptedVal.length - 1), getPassword()).toString(CryptoJS.enc.Utf8);
}

class CryptoCommandArg extends CommandArg {
    constructor(delegatee) {
        super(null);
        this.delegatee = delegatee;
    }

    getOption(optionName = '') {
        const encryptedValues = this.delegatee.getOption(optionName);

        // a. 空数据不需要解密
        if (typeof encryptedValues === 'undefined' || null == encryptedValues) {
            return encryptedValues;
        }
        if (Array.isArray(encryptedValues) && encryptedValues.length === 0) {
            return encryptedValues;
        }

        // b. 
        return decrypt(encryptedValues);
    }

    static decorate(cmdArg) {
        return new CryptoCommandArg(cmdArg);
    }
}

module.exports = CryptoCommandArg;