const CommandArg = require('@cmdcore/CommandArg.js');
const AES = require('crypto-js/aes');

decrypt = (encryptedVal, password) => {
    if (Array.isArray(encryptedVal)) {
        if (0 === encryptedVal.length) {
            return encryptedVal;
        }
        return encryptedVal.map(encrypted => decrypt(encrypted, password));
    }
    if (typeof encryptedVal !== 'string' && !(encryptedVal instanceof String)) {
        return encryptedVal;
    }
    if (null == encryptedVal || 0 === encryptedVal.length || !encryptedVal.startsWith('ENC(') || !encryptedVal.endsWith(')')) {
        return encryptedVal;
    }
    return AES.decrypt(encryptedVal, password);
}

class CryptoCommandArg extends CommandArg {
    constructor(password, delegatee) {
        super(null);
        this.password = password;
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
        return decrypt(encryptedValues, this.password);
    }

    static decorate(password, cmdArg) {
        return new CryptoCommandArg(password, cmdArg);
    }
}

module.exports = CryptoCommandArg;