#!/usr/bin/env node
'use strict';

var meow = require('meow');
var addCollab = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ github-add-collab <owner> <collaborator> <space separated repos>'
		'  $ github-add-collab sindresohus tunnckoCore meow chalk',
		'  $ github-add-collab sindresohus tunnckoCore meow chalk --token 523ef69119eadg12',
		'',
		'Options',
		'  -t, --token    Github token to authenticate with'
	].join('\n')
}, {
	string: ['token'],
	alias: {t: 'token'}
});

var owner = cli.input[0];
var user = cli.input[1];
var repos = cli.input.slice(2);
var opts = cli.flags;
opts.owner = owner;

addCollab(user, repos, opts, function (err, data) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}
	console.log('Successfully added collaborator');
	process.exit(0);
});
