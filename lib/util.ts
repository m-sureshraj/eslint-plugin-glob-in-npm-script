import isGlob from 'is-glob';

export function isQuoted(string: string): boolean {
  return (
    (string.startsWith("'") && string.endsWith("'")) ||
    (string.startsWith('"') && string.endsWith('"'))
  );
}

export function extractGlobsFromString(string = ''): string[] {
  return string.split(' ').filter(token => isGlob(token));
}
