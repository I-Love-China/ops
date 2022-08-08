const Command = require("@cmdcore/Command.js");
const simpleGit = require('simple-git');
const { getAllRepoHttpUrl, addAuthToUrl, extractProjectName, extractProjectNP } = require('@util/GitlabUtil.js');
const { getReadableTimestamp } = require('@util/DateUtil.js');

const commandName = "gitlab-backup";

class GitlabBackupCommand extends Command {
    constructor(commandArg) {
        super(commandName, commandArg);
    }

    async execute() {
        const [gitlabBaseUrl, accessToken, excludesOption] = this.commandArg.getOptions('url', 'ak', 'excludes');

        let cloneUrls = (await getAllRepoHttpUrl(gitlabBaseUrl, accessToken) || [])
            .map(httpUrl => addAuthToUrl(httpUrl, accessToken));
        // 过滤不需要备份的项目
        if (excludesOption && excludesOption.length > 0) {
            const excludes = [excludesOption].flat();
            cloneUrls = cloneUrls.filter(url => excludes.every(exclude => url.indexOf(exclude) < 0));
        }
        if (!cloneUrls || 0 === cloneUrls.length) {
            return;
        }


        // clone these repositories one by one
        const backupDir = `./output/${commandName}/${getReadableTimestamp()}`;
        let completedCount = 0;
        const totalCount = cloneUrls.length;
        for (const cloneUrl of cloneUrls) {
            console.log(`backing up gitlab repository ${cloneUrl} --- ${++completedCount} / ${totalCount}`);
            await simpleGit().clone(
                cloneUrl,
                `${backupDir}/${extractProjectNP(cloneUrl)}/${extractProjectName(cloneUrl)}`
            )
        }
    }

    usage() {
        return `${commandName} -url <gitlabBaseUrl> -ak <accessToken> -excludes xxx1 xxx2`;
    }
}

module.exports = GitlabBackupCommand;