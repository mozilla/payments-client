
function getDeployMessage() {
  var ret = '\n\n';
  if (process.env.TRAVIS !== 'true') {
    ret += 'missing env vars for travis-ci';
    return ret;
  }
  ret += 'branch:       ' + process.env.TRAVIS_BRANCH + '\n';
  ret += 'SHA:          ' + process.env.TRAVIS_COMMIT + '\n';
  ret += 'range SHA:    ' + process.env.TRAVIS_COMMIT_RANGE + '\n';
  ret += 'build id:     ' + process.env.TRAVIS_BUILD_ID + '\n';
  ret += 'build number: ' + process.env.TRAVIS_BUILD_NUMBER + '\n';
  return ret;
}

module.exports = {
  // This is a special branch that contains the built files.
  release: {
    options: {
      // silent option prevents decrypted credentials leaking into
      // travis logs. See https://github.com/tschaub/grunt-gh-pages#optionssilent
      silent: true,
      branch: 'releases',
      clone: '.grunt/grunt-gh-pages/releases/',
      user: {
        name: process.env.GH_USER,
        email: process.env.GH_EMAIL,
      },
      repo: 'https://' + process.env.GH_TOKEN + '@github.com/mozilla/payments-client.git',
      message: 'Publish docker build branch (auto)' + getDeployMessage(),
      // Delete everything apart from the .travis.yml that already exists
      // in the target (releases) branch. This is a special .travis.yml
      // that handles our deploy.
      only: ['**/*', '!.travis.yml'],
    },
    src: [
      'dist/**/*',
      'package.json',
      'LICENSE',
      'README.md',
      '.gitignore'
    ],
  }
};
