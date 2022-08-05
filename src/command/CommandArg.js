class CommandArg {
    constructor(cmdOptions = '') {
        this.optionMap = new Map();

        const optionArr = cmdOptions.trim().split(/\s+/);
        if (!optionArr) {
            return;
        }

        let optionName = '';
        for (let index = 0, size = optionArr.length; index < size; ++index) {
            if (optionArr[index].startsWith('-')) {
                optionName = optionArr[index].substring(1);
                if (!this.optionMap.has(optionName)) {
                    this.optionMap.set(optionName, []);
                }
                continue;
            }
            
            const valueArr = this.optionMap.get(optionName);
            valueArr.push(optionArr[index]);
        }
    }

    /**
     * 
     * @param {参数名} optionName 
     * @returns 参数值，如果传入多个则返回数据；传入单个则返回字符串
     */
    getOption(optionName = '') {
        const valArr = this.optionMap.get(optionName);
        if (!valArr) {
            return null;
        }

        if (valArr.length === 1) {
            return valArr[0];
        }

        return valArr;
    }

    putOption(optionName = '', optionValue = []) {
        if (this.optionMap.has(optionName)) {
            this.optionMap.get(optionName).push(...optionValue);
            return;
        }
        this.optionMap.set(optionName, optionValue);
    }
}

export default CommandArg;