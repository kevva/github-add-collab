import test from 'ava';
import githubAddCollab from './';

test('add collab to repository', async t => {
	const data = await githubAddCollab('kevva', ['unicorns'], {
		token: process.env.GITHUB_TOKEN
	});

	t.ok(data.includes('unicorn/unicorns'));
});

test('add collab to all repositories', async t => {
	const data = await githubAddCollab('kevva', {
		token: process.env.GITHUB_TOKEN,
		addToAll: true
	});

	t.ok(data.includes('unicorn/unicorns'));
	t.ok(data.includes('unicorn/unicorn'));
});

test('add collab to all source repositories', async t => {
	const data = await githubAddCollab('kevva', {
		token: process.env.GITHUB_TOKEN,
		addToSources: true
	});

	t.ok(data.includes('unicorn/unicorns'));
});
