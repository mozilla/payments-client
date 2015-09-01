[![Build Status](https://travis-ci.org/mozilla/payments-client.svg)](https://travis-ci.org/mozilla/payments-client)
[![npm version](https://badge.fury.io/js/mozilla-payments-client.svg)](http://badge.fury.io/js/mozilla-payments-client)
[![devDependency Status](https://david-dm.org/mozilla/payments-client/dev-status.svg)](https://david-dm.org/mozilla/payments-client#info=devDependencies)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/moz-payments-client.svg)](https://saucelabs.com/u/moz-payments-client)

*Note: Sauce Labs tests are only run on PRs from the main repo or commits to master.*


# Payments Client

This is a JS client for making payments via mozilla payments.

## Installation

```shell
npm install --save mozilla-payments-client
```

## Development

You can run a lightweight server to host the bundled payments client which is
useful for testing as a script on another site
(such as the [payments example site][example-site]).
This serves a distribution bundle but also re-builds the bundle any time
a file changes.

Start the server like this:

```
grunt serve
```

### Proxying with Charles

The [example site][example-site] uses a bundled version of the client library by
default so one way to try out your edits on the example site is to re-route bundle
requests to your locally served source code bundle using
[Charles Proxy](http://www.charlesproxy.com/).

To do this you import the rewrite config in Charles from "tools -> rewrite"
and then press import and point it at payments-client-rewrite.xml (which can be found
in the 'charles' directory of this project).

Next, [enable Charles proxy for the browser you're using](http://www.charlesproxy.com/documentation/getting-started/)
(installing the firefox plugin first if you're using Firefox).

Once it's up and running, the rewrite rule added above will rewrite any browser
requests for the payment client to the one served by `grunt serve`.

### Manually swapping in a development bundle

Without Charles, you can run this command each time you change some code to keep
the [payments example site][example-site] up to date:

````
grunt build && cp dist/payments-client.js /path/to/payments-example/public/lib/js/
````

Natually, you'd
[release and bump](https://github.com/mozilla/payments-example/#adding-deps)
the example's client dependency to make your changes final.

## Tests

To run the tests locally run: `grunt test`. This will run the unit tests
against Firefox.

### Cross-browser testing

The tests are run only on Firefox when a PR is submitted. When that code is landed
on master, Travis will run the tests on Sauce Labs.

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
* Go to the [releases page on github](https://github.com/mozilla/payments-client/releases) and hit "Draft a new release"
* Use `<VERSION>` for both the tag and the release title. (The tag shouldn't already exist)
* Add what's changed.
* Hit "publish release" and the current rev of master will be tagged and the package will be pushed to npm automatically.

[example-site]: https://github.com/mozilla/payments-example/
