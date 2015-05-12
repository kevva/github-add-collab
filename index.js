'use strict';

var githubRepos = require('github-repositories');
var githubTokenUser = require('github-token-user');
var ghGot = require('gh-got');
var eachAsync = require('each-async');

function run(user, repos, opts, cb) {
	eachAsync(repos, function (repo, i, next) {
		var url = 'repos/' + repo + '/collaborators/' + user;

		ghGot.put(url, {
			token: opts.token,
			json: false
		}, function (err, data) {
			if (err) {
				cb(err);
				return;
			}

			cb();
		});
	}, function (err) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, repos);
	});
}

function getRepos(user, login, opts, cb) {
	githubRepos(login, {token: opts.token}, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		if (opts.addToSources) {
			data = data.filter(function (el) {
				return !el.fork;
			});
		}

		data = data.map(function (el) {
			return el.full_name;
		});

		run(user, data, opts, cb);
	});
}

module.exports = function (user, repos, opts, cb) {
	opts = opts || {};

	if (typeof user !== 'string') {
		throw new Error('User required');
	}

	if (!cb && typeof repos === 'object') {
		cb = opts;
		opts = repos;
		repos = [];
	}

	if (!Array.isArray(repos)) {
		throw new Error('Expected an array');
	}

	if (!opts.token) {
		throw new Error('Token is required to authenticate with Github');
	}

	if (repos.length && (opts.addToAll || opts.addToSources)) {
		throw new Error('`addToAll` and `addToSources` cannot be used with `repos`');
	}

	githubTokenUser(opts.token, function (err, data) {
		if (!repos.length && (opts.addToAll || opts.addToSources)) {
			getRepos(user, data.login, opts, cb);
			return;
		}

		repos = repos.map(function (repo) {
			return repo.split('/')[1] ? repo : data.login + '/' + repo;
		});

		run(user, repos, opts, cb);
	});
};
