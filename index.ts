import { jsonProcessors } from './lib/jsonProcessors';
import { rule } from './lib/unquotedGlobRule';

export = {
  processors: {
    '.json': jsonProcessors,
  },
  rules: {
    'unquoted-glob': rule,
  },
};
