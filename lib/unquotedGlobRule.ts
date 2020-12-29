// https://eslint.org/docs/developer-guide/working-with-rules

import path from 'path';

import type { Rule } from 'eslint';
import type { Node } from './types';

import { isQuoted, extractGlobsFromString } from './util';

function create(context: Rule.RuleContext): Rule.RuleListener {
  const filename = context.getFilename();

  if (path.basename(filename) !== 'package.json') return {};

  const { ignoredScripts = [] } = context.options[0] || {};

  return {
    AssignmentExpression(node) {
      // Workaround to skip the type check
      const _node = (node as unknown) as Node;

      const scripts = _node.right.properties.find(p => p.key.value === 'scripts');
      if (!scripts) return;

      const filteredScripts = scripts.value.properties.filter(
        node => !ignoredScripts.includes(node.key.value)
      );
      if (filteredScripts.length === 0) return;

      filteredScripts.map(node => {
        extractGlobsFromString(node.value.value).forEach(glob => {
          if (!isQuoted(glob)) {
            context.report({
              // @ts-ignore
              node,
              message: `disallow unquoted glob: ${glob}`,
            });
          }
        });
      });
    },
  };
}

export const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow unquoted glob pattern',
    },
    schema: [
      // should follow JSON schema rules
      {
        type: 'object',
        properties: {
          ignoredScripts: {
            type: 'array',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create,
};
