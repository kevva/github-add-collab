# github-add-collab [![Build Status](http://img.shields.io/travis/kevva/github-add-collab.svg?style=flat)](https://travis-ci.org/kevva/github-add-collab)

> Add collaborators to GitHub repos


## Install

```bash
$ npm install --save github-add-collab
```


## Usage

```js
var githubAddCollab = require('github-add-collab');

githubAddCollab('johndoe', ['github-add-collab', 'yeoman/yo'], {
	token: '523ef691191'
}, function (err, data) {
	console.log('Successfully added user johndoe to github-add-collab and yeoman/yo');
});
```


## API

### githubAddCollab(user, [repos], options, callback)

#### user

*Required*  
Type: `string`

Username to add as collaborator.

#### repos

Type: `array`

Repos to add the collaborator to.

#### options.token

*Required*  
Type: `string`

Token to authenticate with. If you don't have a token you can generate a new one [here](https://github.com/settings/tokens/new).

#### options.addToAll

Type: `boolean`

If no repos are defined and this option is set to `true` it'll add the user to all repositories that the token has access to.

#### callback(err)

Type: `function`

Returns an error if something goes wrong.


## CLI

```sh
$ npm install --global github-add-collab
```

```sh
$ github-add-collab --help

  Usage
    $ github-add-collab <user> [repos]

  Example
    $ github-add-collab johndoe github-add-collab yeoman/yo --token 523ef69119
    $ github-add-collab johndoe --add-to-all --token 523ef69119

  Options
    -a, --add-to-all    Add to all repositories
    -t, --token         Github token to authenticate with
    -v, --verbose       Show detailed output
```


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
