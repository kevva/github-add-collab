#!/usr/bin/env node
'use strict';
const meow = require('meow');
const githubAddCollab = require('./');

const cli = meow(`
	Usage
	  $ github-add-collab <user> [repos]

	Example
	  $ github-add-collab johndoe github-add-collab yeoman/yo --token 523ef69119
	  $ github-add-collab johndoe --add-to-all --token 523ef69119

	Options
	  -a, --add-to-all      Add to all repositories
	  -s, --add-to-sources  Add to source repositories
	  -t, --token           Github token to authenticate with
	  -v, --verbose         Show detailed output
`, {
	boolean: ['add-to-all', 'verbose'],
	string: ['token'],
	alias: {
		a: 'add-to-all',
		s: 'add-to-sources',
		t: 'token',
		v: 'verbose'
	}
});

const user = cli.input.shift();
const repos = cli.input;

if (!user) {
	console.error('User required');
	process.exit(1);
}

githubAddCollab(user, repos, cli.flags).then(data => {
	console.log(`Added user ${user} to ${data.length} repositories`);

	if (cli.flags.verbose) {
		console.log();

		data.forEach(x => {
			console.log(x);
		});
	}
});
