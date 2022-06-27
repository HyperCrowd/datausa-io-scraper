import { Command } from 'commander';
import { getOccupationData } from './occupations';

export async function main(filePath: string = process.argv[2]) {
  const data = await getOccupationData(filePath);
  console.log(JSON.stringify(data, null, 2));
  return data;
}

main();
