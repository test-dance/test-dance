const { context } = require('@actions/github/lib/github');
const { get } = require('got');

const { payload } = context;
const pullNumber = payload.pull_request.number;
const owner = payload.repository.owner.login;
const repo = payload.repository.name;

(async () => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`;
  const result = await get(url, {
    headers: {
      'Authorization': `token ${process.env.TOKEN}`,
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  });
  console.log(result.body);
  const files = JSON.parse(result.body).map(({filename}) => filename);
  console.log(files);

  process.exit(0);
})();