# github-add-collab [![Build Status](http://img.shields.io/travis/kevva/github-add-collab.svg?style=flat)](https://travis-ci.org/kevva/github-add-collab)

> Add collaborators to Github repos

## Install

```bash
$ npm install --save github-add-collab
```

## Usage

```js
var githubAddCollab = require('github-add-collab');

githubAddCollab('johndoe', ['github-add-collab'], {
	owner: 'kevva',
	token: '523ef691191'
} function (err, data) {
	if (err) {
		throw err;
	}

	console.log('Successfully added user johndoe to github-add-collab');
});
```

## API

### githubAddCollab(user, [repos], opts, cb)

#### user

Type: `string`

Username to add as collaborator.

#### repos

Type: `array`

Repos to add the collaborator to. If no repos are defined it'll add the user to 
all repositories owned by `opts.owner`.

#### opts.owner

Type: `string`

Repository owner username.

#### opts.token

Type: `string`

Token to authenticate with. If you don't have a token you can generate a new one [here](https://github.com/settings/tokens/new).

#### cb(err)

Type: `function`

Returns an error if something goes wrong.

## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
