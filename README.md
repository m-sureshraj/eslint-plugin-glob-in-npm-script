# eslint-plugin-glob-in-npm-script

This plugin helps us to catch unquoted [glob](https://en.wikipedia.org/wiki/Glob_(programming)) usages in NPM scripts.
Okay, what's wrong with the unquoted glob? It's all about
how shells expand the globstar `**`. [This blog](https://medium.com/@jakubsynowiec/you-should-always-quote-your-globs-in-npm-scripts-621887a2a784) post explains why
we should always quote the glob in NPM scripts, and the
different behaviors in great detail.
