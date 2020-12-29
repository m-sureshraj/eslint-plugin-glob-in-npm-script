import { expect } from 'chai';

import { isQuoted, extractGlobsFromString } from '../util';

describe('extractGlobsFromString', () => {
  it('should extract globs from a string', () => {
    expect(extractGlobsFromString("eslint '**/*.js'")).to.eql(["'**/*.js'"]);

    expect(
      extractGlobsFromString('prettier --write "./**/*.{js,jsx,ts,tsx,css,scss,md}"')
    ).to.eql(['"./**/*.{js,jsx,ts,tsx,css,scss,md}"']);

    expect(
      extractGlobsFromString(
        "lerna '{@hello/+(saas-server|saas-web),@hello-clients/admin}'"
      )
    ).to.eql(["'{@hello/+(saas-server|saas-web),@hello-clients/admin}'"]);
  });
});

describe('isGlobQuoted', () => {
  it('string should starts and ends with the same quote', () => {
    expect(isQuoted("'hello world'")).to.be.true;
    expect(isQuoted('"hello world"')).to.be.true;

    expect(isQuoted('"hello world\'')).to.be.false;
    expect(isQuoted('\'hello world"')).to.be.false;
    expect(isQuoted('hello world')).to.be.false;
  });
});
