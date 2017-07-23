'use strict';
const githubRepos = require('github-repositories');
const githubTokenUser = require('github-token-user');
const ghGot = require('gh-got');

const run = (user, repos, opts) => Promise.all(repos.map(x => {
	const url = `repos/${x}/collaborators/${user}`;

	return ghGot.put(url, {
		token: opts.token,
		json: false
	}).then(() => x);
}));

const getRepos = (user, login, opts) => {
	return githubRepos(login, {token: opts.token}).then(data => {
		if (opts.addToSources) {
			data = data.filter(x => !x.fork);
		}

		data = data.map(x => x.full_name);

		return run(user, data, opts);
	});
};

module.exports = (user, repos, opts) => {
	opts = Object.assign({}, opts);

	if (typeof user !== 'string') {
		return Promise.reject(new Error('User required'));
	}

	if (typeof repos === 'object' && !Array.isArray(repos)) {
		opts = repos;
		repos = [];
	}

	if (!Array.isArray(repos)) {
		return Promise.reject(new TypeError(`Expected an \`Array\` of repos, got \`${typeof repos}\``));
	}

	if (repos.length > 0 && (opts.addToAll || opts.addToSources)) {
		return Promise.reject(new Error('`addToAll` and `addToSources` cannot be used with `repos`'));
	}

	return githubTokenUser(opts.token).then(data => {
		if (repos.length === 0 && (opts.addToAll || opts.addToSources)) {
			return getRepos(user, data.login, opts);
		}

		repos = repos.map(x => x.split('/')[1] ? x : `${data.login}/${x}`);

		return run(user, repos, opts);
	});
};
