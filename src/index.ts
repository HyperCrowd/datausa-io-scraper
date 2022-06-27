import { Command } from 'commander';
import { getOccupationData } from './occupations';

async function main() {
  const occupations = {
    cashiers: await getOccupationData('pages/occupations/cashiers.html'),
  };

  // console.log(occupations);
}

main();
