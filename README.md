[![Build Status](https://travis-ci.org/mozilla/payments-client.svg)](https://travis-ci.org/mozilla/payments-client)
[![npm version](https://badge.fury.io/js/mozilla-payments-client.svg)](http://badge.fury.io/js/mozilla-payments-client)
[![devDependency Status](https://david-dm.org/mozilla/payments-client/dev-status.svg)](https://david-dm.org/mozilla/payments-client#info=devDependencies)

# Payments Client

This is a JS client for making payments via mozilla payments.

## Installation

```shell
npm install --save mozilla-payments-client
```

## Development

In order to develop the payments-client along side the payments-example site you can run:

```
grunt serve
```

Using [Charles Proxy](http://www.charlesproxy.com/) you can re-write to the payments-client src
served by mozilla/payments-example with the built file containing changes you're working from.

To do this import the charles rewrite config (see the Charles directory).

## Cutting a release

With all the changes you want already landed in master - here's the steps for cutting a new release:

* Bump the version in `package.json`.
* Commit it to master
* Go to the releases page on github [1] and hit "Draft a new release"
* Use `<VERSION>` for both the tag and the release title. (The tag shouldn't already exist)
* Add what's changed.
* Hit "publish release" and the current rev of master will be tagged and the package will be pushed to npm automatically.

[1] https://github.com/mozilla/payments-client/releases
