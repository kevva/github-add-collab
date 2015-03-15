'use strict';

var githubRepos = require('github-repositories');
var got = require('got');
var eachAsync = require('each-async');

function addCollab(user, repo, opts, cb) {
	var url = [
		'https://api.github.com/repos/' + opts.owner + '/',
		repo + '/collaborators/' + user
	].join('');

	got.put(url, {headers: opts.headers}, function (err) {
		if (err) {
			cb(err);
			return;
		}

		cb();
	});
}

module.exports = function (user, repos, opts, cb) {
	opts = opts || {};

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

	if (!opts.owner) {
		throw new Error('Owner is required');
	}

	opts.headers = {
		Accept: 'application/vnd.github.v3+json',
		Authorization:'token ' + opts.token,
		'Content-Length': 0
	};

	githubRepos(opts.owner, {token: opts.token}, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		eachAsync(data, function (repo, i, next) {
			if (repos.length && repos.indexOf(repo.name) === -1) {
				next();
				return;
			}

			addCollab(user, repo.name, opts, next);
		}, function (err) {
			if (err) {
				cb(err);
				return;
			}

			cb();
		});
	});
};
