import { readFile } from 'fs/promises';
const { parse } = require('himalaya');

/**
 *
 */
export const scrape = async (filePath: string) => {
  const dom = (await readFile(filePath)).toString();
  return parse(dom);
};
