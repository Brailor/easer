easer
=====

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coveralls][BadgeCoveralls]][Coveralls]

## About

A simple, generic express server with built-in authentication and authorization.

It is built on top of Express.js which runs on Node.js.

It reads the rest-api module, and provides a simple express server,
which echoes the mock data defined under the services.

You can modify and extend this code as you like to fit your needs.

Note: It is in experimental stage, and its features under development and matter of continuous change.


## Prerequisites

In order to run the server, you need to have the Node.js and npm installed on your machine.


## Installation

The `easer` is made to act as a standalone application server, so it's preferred installation is:

```bash
    npm install -g easer
```

For development purposes clone the [easer](https://github.com/tombenke/easer) server into a folder:

```bash
    clone git@github.com:/easer.git
```

Install the required dependencies:

```bash
    cd easer
    npm install
```


## Usage

### Start the server

In global mode you can start the server with the `easer server` command.

During development, execute the following command in the project folder:

Start the server:

```bash
    $ npm start ./dist/webServerApp.js

    > easer@1.0.0 start /home/tombenke/topics/easer
    > node server/index.js

    Express server listening on port 3007
```

then open the [public landing page URL](http://localhost:3007).
Login with the guest/guest username/password credentials,
and see the user profile under the private pages.
Logout, then try to access again to the private area, then you should be forwarded 
to the login form again.

Double check the server log, and you should see something like this:

```bash
    GET / 200 24.014 ms - 791
    GET /favicon.ico 404 4.760 ms - 24
    GET /login.html 304 7.633 ms - -
    POST /login 302 51.621 ms - 62
    GET /private/ 304 2.385 ms - -
    GET /private/profile 200 7.420 ms - 1275
    GET /logout 302 3.989 ms - 46
    GET / 304 3.283 ms - -
    GET /private/profile 302 3.500 ms - 66
    GET /login.html 304 1.980 ms - -
```

### Server configuration

`easer` is configured through the following environment variables:

- `EASER_PORT`: The port where the server will listen.
- `EASER_USE_PDMS` If `true`, then uses the Pattern Driven Micro Service API
   of the npac container. Default: `false`.
   See [npac-pdms-hemera-adapter](https://www.npmjs.com/package/npac-pdms-hemera-adapter)
   for further details.
- `PDMS_NATS_URI`: The NATS server uri used by the pdms adapter.
  Default: "nats://demo.nats.io:4222".
- `EASER_VIEWSPATH`: The base path for the server-side view templates.
- `EASER_CONTENTPATH_PUBLIC`: The base path for the public content.
- `EASER_CONTENTPATH_PRIVATE`: The base path for the private pages.
- `EASER_USERS`: YAML format file, which describes the user credentials.
- `EASER_AUTH_SUCCESS_REDIRECT`: The `successRedirect` config parameter of the authentication middleware.
  Default: `null`.
- `EASER_AUTH_FAILURE_REDIRECT`: The `failureRedirect` config parameter of the authentication middleware.
  Default: `null`.
- `EASER_LOGOUT_REDIRECT`: The redirect path of logout operation. Default: `null`.
- `EASER_RESTAPIPATH`: The base path to the rest api endpoint descriptors.
  See [rest-tool](https://www.npmjs.com/package/rest-tool) for further details.

See [src/config/index.js](src/config/index.js) for default values.

__Note:__ The server holds a default content to demonstrate the login, logout, and private pages.
By default the redirections of authentication is not configured,
so you have to set the following environment variables to see the full demo of login/logout process:

```bash
    export EASER_AUTH_SUCCESS_REDIRECT="/private/"
    export EASER_AUTH_FAILURE_REDIRECT="/login.html"
```

#### Managing user credentials

See [src/config/defaults/users.yml](src/config/defaults/users.yml) as an example.

To add a new user, simply create a new user object, in the `users.yml` file,
and define the `username`, `email` and `fullName` values.
The `id` field must be unique, that you can generate via the `uuidgen` utility.
The password hash can be generated via the `easer encpwd -p <password>` command:


```bash
    ./dist/encpwdApp.js -p SeCRet-paZZw0rd
    SeCRet-paZZw0rd >> $2a$10$j4flrJ4WTMG.disTrEZ4juEkn3pz20zvFuNYbt6gli3Qiuv5emTDe
```

Then copy the bcrypted result into the user's `password` field.

__Note:__ _This is temporary, not really secure solution to the CLI tool,
so make sure that nobody can see the screen and access to the console log.
Also make sure that the users.yml is not placed to a publicly available place,
nor into a folder, where the normal users can easily access to it._

### TODO
- Add public static pages and forwarding to 404(/401, Unauthorized) and 500
- Implement ACL for authorization.
- Select between HTTP/HTTPS.
- Implement password generator to work directly into the user credentials file.

### References
- [Passport - Simple, unobtrusive authentication for Node.js](http://www.passportjs.org/)
- [jaredhanson/passport-local](https://github.com/jaredhanson/passport-local)
- [Easy Node Authentication...](https://scotch.io/tutorials/easy-node-authentication-setup-and-local)
- [Express over HTTPS](http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/)

- [How To Safely Store A Password](https://codahale.com/how-to-safely-store-a-password/)
- [bcrypt / wikipedia](https://en.wikipedia.org/wiki/Bcrypt)
- [bcrypt / npmjs.org](https://www.npmjs.com/package/bcrypt)

---

This project was generated from the [ncli-archetype](https://github.com/tombenke/ncli-archetype)
project archetype, using the [kickoff](https://github.com/tombenke/kickoff) utility.

[npm-badge]: https://badge.fury.io/js/easer.svg
[npm-url]: https://badge.fury.io/js/easer
[travis-badge]: https://api.travis-ci.org/tombenke/easer.svg
[travis-url]: https://travis-ci.org/tombenke/easer
[Coveralls]: https://coveralls.io/github/tombenke/easer?branch=master
[BadgeCoveralls]: https://coveralls.io/repos/github/tombenke/easer/badge.svg?branch=master
