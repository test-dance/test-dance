const { context } = require('@actions/github/lib/github');
console.log('Hello I am action');

const { payload } = context;
console.log(payload);
const pullNumber = payload.pull_request.number;
const owner = payload.repository.owner.login;
const repo = payload.repository.name;

(async () => {
  console.log(owner);
  console.log(repo);
  const result = await get(`https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`);
  console.log(result.body);
  const files = JSON.parse(result.body).map(({filename}) => filename);
  console.log(files);

  process.exit(0);
})();