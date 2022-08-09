const Command = require("@cmdcore/Command.js");
const { getAllRepos, getGitlabClient } = require('@util/GitlabUtil.js');
const readline = require('readline-sync');

const commandName = "gitlab-tag";


// https://github.com/ds300/patch-package/issues/35
// https://github.com/repo-utils/gitlab/pull/33/files
// https://www.mariokandut.com/how-to-patch-an-npm-dependency/
class GitlabTagCommand extends Command {
    constructor(commandArg) {
        super(commandName, commandArg);
    }

    async execute() {
        const [gitlabBaseUrl, accessToken] = this.commandArg.getOptions('url', 'ak');
        const repos = await getAllRepos(gitlabBaseUrl, accessToken) || [];
        if (!repos || !repos.length) {
            return;
        }

        const [tag_name, ref] = [
            readline.question(`Please type in the new tag name: `),
            readline.question(`Please type in the ref branch: `)
        ];

        const createTagFn = getGitlabClient(gitlabBaseUrl, accessToken).repositoryTags.create;

        for (const { id } of repos) {
            await createTagFn({ id, tag_name, ref });
        }
    }

    usage() {
        return `${commandName} -url <gitlabBaseUrl> -ak <accessToken>`;
    }
}

module.exports = GitlabTagCommand;