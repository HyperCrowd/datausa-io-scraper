import { Command } from 'commander';
import { getOccupationData } from './occupations';

async function main() {
  const occupations = {
    cashiers: await getOccupationData('pages/2019/occupations/cashiers.html'),
  };

  console.log(occupations);

  return occupations;
}

main();
