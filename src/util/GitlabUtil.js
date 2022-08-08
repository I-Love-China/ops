const gitlab = require("node-gitlab");

exports.getAllRepoHttpUrl = async (gitlabBaseUrl = '', accessToken = '') => {
    const client = gitlab.createPromise({
        api: `${gitlabBaseUrl}/api/v3`,
        privateToken: accessToken
    });

    // https://github.com/repo-utils/gitlab/issues/14
    return (await client.projects.list({ per_page: Number.MAX_SAFE_INTEGER }))
        .map(({ http_url_to_repo }) => http_url_to_repo);
}

exports.addAuthToUrl = (httpUrlToRepo = '', accessToken = '') => {
    // https://stackoverflow.com/questions/25409700/using-gitlab-token-to-clone-without-authentication
    return httpUrlToRepo.replace('://', `://oauth2:${accessToken}@`);
}

exports.extractProjectName = (cloneUrl = '') => {
    const lastSlashIndex = cloneUrl.lastIndexOf('/'),
        lastDotIndex = cloneUrl.lastIndexOf('.');
    return cloneUrl.substring(lastSlashIndex + 1, lastDotIndex);
}

exports.extractProjectNP = (cloneUrl = '') => {
    const splittedArr = cloneUrl.split('/');
    return splittedArr[splittedArr.length - 2];
}