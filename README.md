[![Build Status](https://travis-ci.org/mozilla/payments-client.svg)](https://travis-ci.org/mozilla/payments-client)
[![npm version](https://badge.fury.io/js/mozilla-payments-client.svg)](http://badge.fury.io/js/mozilla-payments-client)
[![devDependency Status](https://david-dm.org/mozilla/payments-client/dev-status.svg)](https://david-dm.org/mozilla/payments-client#info=devDependencies)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/payments-client.svg)](https://saucelabs.com/u/payments-client)

*Note: Sauce Labs tests are only run on PRs from the main repo or commits to master.*


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

## Tests

To run the tests locally run: `grunt test`. This will run the unit tests
against Firefox.

### Cross-browser testing

The tests are run only on Firefox when a PR is submitted. When that code is landed
Travis will run the tests on Sauce Labs.

#### Running Sauce Labs on a PR [Team Only]

If you're a member of the payments team and you want to get Sauce Labs coverage
for a PR - push the branch to the main `mozilla/payments-client` repo and make a PR
from that.

#### Running the tests on SauceLabs locally

First [Sign-up for a Sauce Labs 'Open Sauce' account](https://saucelabs.com/opensauce/)
to get your keys.

Then you'll need to export the SauceLabs username and access key as env vars:

```shell
export SAUCE_USERNAME=<YOUR_OPEN_SAUCE_USERNAME>
export SAUCE_ACCESS_KEY=<YOUR_ACCESS_KEY>
```

Then you should find you can run: `grunt karma:sauce` and run all the tests on SauceLabs.

## Cutting a release

With all the changes you want already landed in master - here's the steps for cutting a new release:

* Bump the version in `package.json`.
* Commit it to master
* Go to the releases page on github [1] and hit "Draft a new release"
* Use `<VERSION>` for both the tag and the release title. (The tag shouldn't already exist)
* Add what's changed.
* Hit "publish release" and the current rev of master will be tagged and the package will be pushed to npm automatically.

[1] https://github.com/mozilla/payments-client/releases
