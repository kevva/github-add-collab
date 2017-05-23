import test from 'ava';
import m from '.';

test('add collab to repository', async t => {
	const [repo] = await m('octocat', ['playground'], {
		token: process.env.GITHUB_TOKEN
	});

	t.is(repo, 'bRuNoLeVeRmAnZoR/playground');
});

test('add collab to all repositories', async t => {
	const [download, playground] = await m('octocat', {
		token: process.env.GITHUB_TOKEN,
		addToAll: true
	});

	t.is(download, 'bRuNoLeVeRmAnZoR/download');
	t.is(playground, 'bRuNoLeVeRmAnZoR/playground');
});

test('add collab to all source repositories', async t => {
	const [repo] = await m('octocat', {
		token: process.env.GITHUB_TOKEN,
		addToSources: true
	});

	t.is(repo, 'bRuNoLeVeRmAnZoR/playground');
});
