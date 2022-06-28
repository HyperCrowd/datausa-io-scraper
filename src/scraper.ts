import { readFile } from 'fs/promises';
import * as cheerio from 'cheerio';
//const { parse } = require('himalaya');

/**
 *
 */
export const scrape = async (filePath: string) => {
  const dom = (await readFile(filePath)).toString();
  return cheerio.load(dom);
};


/**
 *
 */
/*
export const oldScrape = async (filePath: string) => {
  const dom = (await readFile(filePath)).toString();
  return parse(dom);
};
*/