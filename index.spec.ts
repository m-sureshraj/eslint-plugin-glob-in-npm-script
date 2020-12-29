import { expect } from 'chai';

import eslintPluginInterface from './index';

describe('plugin interface', () => {
  it('exported object should confirm the following interface', () => {
    expect(eslintPluginInterface.rules['unquoted-glob']).to.be.an('object');
    expect(eslintPluginInterface.processors['.json']).to.be.an('object');
  });
});
