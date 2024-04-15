const { get } = require('https');

const ENDPOINT = 'https://nodejs.org/dist/index.json';

function requestVersionInfo(url) {
    return new Promise((resolve, reject) => {
        get(url, response => {
            let data = '';
            response.on('data', chunk => data += chunk);
            response.on('end', () => resolve(data));
        }).on('error', error => reject(new Error(error)));
    });
}

function extractVersionInfo(json) {
    return JSON.parse(json).map(({ version, npm = null }) => {
        return {
            nodejs: version.replace(/^v/, ''),
            npm
        };
    });
}

(async function logVersionInfo() {
    try {
        const json = await requestVersionInfo(ENDPOINT);
        const versionInfo = extractVersionInfo(json);
        console.log(JSON.stringify(versionInfo, null, 2));

    } catch ({ message }) {
        console.error(message);
    }
})();