# github-add-collab [![Build Status](https://travis-ci.org/kevva/github-add-collab.svg?branch=master)](https://travis-ci.org/kevva/github-add-collab)

> Add collaborators to GitHub repos


## Install

```
$ npm install --save github-add-collab
```


## Usage

```js
const githubAddCollab = require('github-add-collab');

githubAddCollab('johndoe', ['github-add-collab', 'yeoman/yo'], {
	token: '523ef691191'
}).then(data => {
	console.log('Successfully added user johndoe to github-add-collab and yeoman/yo');
});
```


## API

### githubAddCollab(user, [repos], options)

Returns a promise for an `array`.

#### user

*Required*<br>
Type: `string`

Username to add as collaborator.

#### repos

Type: `array`

Repos to add the collaborator to.

#### options

##### token

*Required*<br>
Type: `string`

Token to authenticate with. If you don't have a token you can generate a new one [here](https://github.com/settings/tokens/new).

##### addToAll

Type: `boolean`

If no repos are defined and this option is set to `true` it'll add the user to all repositories that the token has access to.

##### addToSources

Type: `boolean`

If no repos are defined and this option is set to `true` it'll add the user to all non-forked repositories that the token has access to.


## Related

* [github-add-collab-cli](https://github.com/kevva/github-add-collab-cli) - CLI for this module


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
