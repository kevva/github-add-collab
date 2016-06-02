import test from 'ava';
import m from './';

test('add collab to repository', async t => {
	const data = await m('sindresorhus', ['playground'], {
		token: process.env.GH_TOKEN
	});

	t.true(data.indexOf('kevva/playground') !== -1);
});

test('add collab to all repositories', async t => {
	const data = await m('kevva', {
		token: process.env.GH_TOKEN,
		addToAll: true
	});

	t.true(data.indexOf('kevva/playground') !== -1);
	t.true(data.indexOf('kevva/github-add-collab') !== -1);
});

test('add collab to all source repositories', async t => {
	const data = await m('kevva', {
		token: process.env.GH_TOKEN,
		addToSources: true
	});

	t.true(data.indexOf('kevva/playground') !== -1);
});
