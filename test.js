'use strict';
var test = require('ava');
var githubAddCollab = require('./');

test('add collab to repository', function (t) {
	t.plan(3);

	githubAddCollab('kevva', ['unicorns'], {
		token: process.env.GITHUB_TOKEN
	}, function (err, data) {
		t.assert(!err, err);
		t.assert(data.length === 1);
		t.assert(data[0] === 'unicornbot/unicorns');
	});
});

test('add collab to all repositories', function (t) {
	t.plan(2);

	githubAddCollab('kevva', {
		token: process.env.GITHUB_TOKEN,
		addToAll: true
	}, function (err, data) {
		t.assert(!err, err);
		t.assert(data.length === 2);
	});
});

test('add collab to all source repositories', function (t) {
	t.plan(2);

	githubAddCollab('kevva', {
		token: process.env.GITHUB_TOKEN,
		addToSources: true
	}, function (err, data) {
		t.assert(!err, err);
		t.assert(data.length === 1);
	});
});
