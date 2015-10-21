'use strict';
var githubRepos = require('github-repositories');
var githubTokenUser = require('github-token-user');
var ghGot = require('gh-got');
var Promise = require('pinkie-promise');

function run(user, repos, opts) {
	return Promise.all(repos.map(function (repo) {
		var url = 'repos/' + repo + '/collaborators/' + user;

		return ghGot.put(url, {
			token: opts.token,
			json: false
		}).then(function () {
			return repo;
		});
	}));
}

function getRepos(user, login, opts) {
	return githubRepos(login, {token: opts.token}).then(function (data) {
		if (opts.addToSources) {
			data = data.filter(function (el) {
				return !el.fork;
			});
		}

		data = data.map(function (el) {
			return el.full_name;
		});

		return run(user, data, opts);
	});
}

module.exports = function (user, repos, opts) {
	opts = opts || {};

	if (typeof user !== 'string') {
		return Promise.reject(new Error('User required'));
	}

	if (typeof repos === 'object' && !Array.isArray(repos)) {
		opts = repos;
		repos = [];
	}

	if (!Array.isArray(repos)) {
		return Promise.reject(new Error('Expected an array'));
	}

	if (!opts.token) {
		return Promise.reject(new Error('Token is required to authenticate with Github'));
	}

	if (repos.length && (opts.addToAll || opts.addToSources)) {
		return Promise.reject(new Error('`addToAll` and `addToSources` cannot be used with `repos`'));
	}

	return githubTokenUser(opts.token).then(function (data) {
		if (!repos.length && (opts.addToAll || opts.addToSources)) {
			return getRepos(user, data.login, opts);
		}

		repos = repos.map(function (repo) {
			return repo.split('/')[1] ? repo : data.login + '/' + repo;
		});

		return run(user, repos, opts);
	});
};
