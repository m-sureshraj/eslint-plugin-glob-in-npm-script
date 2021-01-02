// https://eslint.org/docs/developer-guide/working-with-plugins#processors-in-plugins

import path from 'path';

import type { Linter } from 'eslint';

const prefix = 'module.exports = ';
const pluginNameWithoutPrefix = 'glob-in-npm-script';

export const jsonProcessors = {
  preprocess(text: string, fileName: string): string[] {
    if (path.basename(fileName) !== 'package.json') return [];

    return [`${prefix}${text}`];
  },

  postprocess(messages: [Linter.LintMessage[]]): Linter.LintMessage[] {
    // Since the preprocess stage converts JSON to Object,
    // eslint runs js rules against it and produces unnecessary error messages.
    // But we're only interested in error messages produced by this plugin.

    return ([] as Linter.LintMessage[])
      .concat(...messages)
      .filter(message => message.ruleId?.startsWith(pluginNameWithoutPrefix));
  },
};
