// https://eslint.org/docs/developer-guide/nodejs-api#ruletester

import { RuleTester } from 'eslint';

import { rule } from '../unquotedGlobRule';
import { jsonProcessors } from '../jsonProcessors';

const ruleTester = new RuleTester();

function getValidAndInvalidGlobUsages() {
  const pkg = {
    name: 'foo',
    scripts: {
      lint: "eslint '**/*.js'",
      'test:invalid': 'mocha **/*.ts',
    },
  };

  return jsonProcessors.preprocess(JSON.stringify(pkg), 'package.json')[0];
}

function getValidGlobUsages() {
  const pkg = {
    name: 'some-pkg',
    scripts: {
      lint: "eslint '**/*.js'",
      format: 'prettier --write "./**/*.{js,jsx,ts,tsx,css,scss,md}"',
      start: "concurrently 'npm:start:*'",
      dev: "lerna --scope '@hello-packages/shared-ui' && npm start --prefix admin-app",
      'bootstrap:talent': "lerna bootstrap '{@hello/talent-client,@hello/talent-server}'",
      'bootstrap:server': "lerna bootstrap '@hello/saas-server' --include-dependencies",
      'bootstrap:client': "lerna bootstrap --ci --scope '@hello/saas-client'",
      'bootstrap:client.candidate': "lerna bootstrap --ci '@hello/saas-client-candidate'",
      bootstrap: "lerna '{@hello/+(saas-server|saas-web),@hello-clients/admin}'",
      'bootstrap:journey': 'lerna bootstrap --ci --scope "@hello/journey-*"',
    },
  };

  return jsonProcessors.preprocess(JSON.stringify(pkg), 'package.json')[0];
}

function getInvalidGlobUsages() {
  const pkg = {
    name: 'some-pkg',
    scripts: {
      'test:invalid': 'mocha **/*.ts',
      'lint:invalid': 'eslint **/*.js',
      'eslint:invalid': 'eslint src/**/*.{ts,tsx}',
      bootstrap: 'lerna bootstrap --ci --scope @hello/journey-* --include-dependencies',
    },
  };

  return jsonProcessors.preprocess(JSON.stringify(pkg), 'package.json')[0];
}

ruleTester.run('unquoted-glob', rule, {
  valid: [
    // valid glob usages
    {
      code: getValidGlobUsages(),
      filename: 'package.json',
    },

    // should skip ignored scripts from linting
    {
      code: getValidAndInvalidGlobUsages(),
      filename: 'package.json',
      options: [
        {
          ignoredScripts: ['test:invalid'],
        },
      ],
    },

    // should lint only package.json
    {
      code: jsonProcessors.preprocess(JSON.stringify({}), 'package.json')[0],
      filename: 'package.lock.json',
    },
  ],
  invalid: [
    {
      code: getInvalidGlobUsages(),
      filename: 'package.json',
      errors: [
        {
          message: 'disallow unquoted glob: **/*.ts',
        },
        {
          message: 'disallow unquoted glob: **/*.js',
        },
        {
          message: 'disallow unquoted glob: src/**/*.{ts,tsx}',
        },
        {
          message: 'disallow unquoted glob: @hello/journey-*',
        },
      ],
    },
  ],
});
