'use strict';

var githubRepos = require('github-repositories');
var githubTokenUser = require('github-token-user');
var got = require('got');
var eachAsync = require('each-async');
var objectAssign = require('object-assign');

function addCollab(user, repo, opts, cb) {
	var url = [
		'https://api.github.com/repos/' + repo + '/',
		'collaborators/' + user
	].join('');

	got.put(url, {headers: opts.headers}, function (err) {
		if (err) {
			cb(err);
			return;
		}

		cb();
	});
}

function run(user, repos, opts, cb) {
	eachAsync(repos, function (repo, i, next) {
		addCollab(user, repo, opts, next);
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

		data = data.map(function (el) {
			return el.full_name;
		});

		run(user, data, opts, cb);
	});
}

module.exports = function (user, repos, opts, cb) {
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

	opts = objectAssign({}, opts);

	opts.headers = {
		Accept: 'application/vnd.github.v3+json',
		Authorization: 'token ' + opts.token,
		'Content-Length': 0,
		'User-Agent': 'https://github.com/kevva/github-add-collab'
	};

	githubTokenUser(opts.token, function (err, data) {
		var username = data.login;

		if (!repos.length && opts.addToAll) {
			getRepos(username, user, opts, cb);
			return;
		}

		repos = repos.map(function (repo) {
			return repo.split('/')[1] ? repo : username + '/' + repo;
		});

		run(user, repos, opts, cb);
	});
};
