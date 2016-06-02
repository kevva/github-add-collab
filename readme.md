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

*Required*  
Type: `string`

Username to add as collaborator.

#### repos

Type: `array`

Repos to add the collaborator to.

#### options

##### token

*Required*  
Type: `string`

Token to authenticate with. If you don't have a token you can generate a new one [here](https://github.com/settings/tokens/new).

##### addToAll

Type: `boolean`

If no repos are defined and this option is set to `true` it'll add the user to all repositories that the token has access to.

##### addToSources

Type: `boolean`

If no repos are defined and this option is set to `true` it'll add the user to all non-forked repositories that the token has access to.


## CLI

```
$ npm install --global github-add-collab
```

```
$ github-add-collab --help

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
```


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
