import { scrape } from './scraper';

const nonNumbers = /[^0-9\.\-]/g;

function getCode(code: string) {
  return code.replace('/profile/', '');
}

function getGeo(str: string) {
  const code = str.replace('/profile/geo/', '');
}

function getNumber(str: string) {
  const last = str[str.length - 1];

  switch (last) {
    case 'K':
    case 'k':
      return parseFloat(str.substring(0, str.length - 1)) * 1000;
    case 'M':
    case 'm':
      return parseFloat(str.substring(0, str.length - 1)) * 1000000;
    case '%':
      return (
        parseFloat(str.replace('−', '-').substring(0, str.length - 1)) / 100
      );
    default:
      return parseFloat(str.replace('−', '-').replace(nonNumbers, ''));
  }
}

export const getOccupationData = async (fileName: string) => {
  const json = await scrape(fileName);
  const contents =
    json[2].children[3].children[1].children[0].children[0].children[0]
      .children[1].children;

  const result = {
    workforce: {
      size: getNumber(
        contents[0]?.children[4]?.children[0]?.children[0]?.children[1]?.children[0].content.trim()
      ),
      oneYearGrowth: {
        value: getNumber(
          contents[2]?.children[2]?.children[8]?.children[0]?.children[1]?.children[1]?.children[0]?.children[0]?.content.trim()
        ),
        errorRate: getNumber(
          contents[2]?.children[2]?.children[8]?.children[0]?.children[1]?.children[1]?.children[2]?.children[1]?.content.trim()
        ),
      },
      mostlyEmployedBy: [
        {
          name: contents[1]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.children[1]?.children[0]?.content.trim(),
          code: getCode(
            contents[1]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.children[1]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[1]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.children[3]?.children[0]?.content.trim(),
          code: getCode(
            contents[1]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.children[3]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[1]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.children[5]?.children[0]?.content.trim(),
          code: getCode(
            contents[1]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.children[5]?.attributes[0]?.value.trim()
          ),
        },
      ],
      highestPayingIndustries: [
        {
          name: contents[2]?.children[2]?.children[7]?.children[0]?.children[1]?.children[0]?.children[1]?.children[0]?.content.trim(),
          code: getCode(
            contents[2]?.children[2]?.children[7]?.children[0]?.children[1]?.children[0]?.children[1]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[2]?.children[2]?.children[7]?.children[0]?.children[1]?.children[0]?.children[3]?.children[0]?.content.trim(),
          code: getCode(
            contents[2]?.children[2]?.children[7]?.children[0]?.children[1]?.children[0]?.children[3]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[2]?.children[2]?.children[7]?.children[0]?.children[1]?.children[0]?.children[5]?.children[0]?.content.trim(),
          code: getCode(
            contents[2]?.children[2]?.children[7]?.children[0]?.children[1]?.children[0]?.children[5]?.attributes[0]?.value.trim()
          ),
        },
      ],
      averageSalary: getNumber(
        contents[0]?.children[4]?.children[0]?.children[2]?.children[1]?.children[0].content.trim()
      ),
      averageAge: getNumber(
        contents[0]?.children[4]?.children[0]?.children[1]?.children[1]?.children[0].content.trim()
      ),
    },
    gender: {
      count: {
        male: getNumber(
          contents[3]?.children[2]?.children[0]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.content.trim()
        ),
        female: getNumber(
          contents[3]?.children[2]?.children[0]?.children[0]?.children[1]?.children[1]?.children[0]?.children[0]?.content.trim()
        ),
      },
      averageSalary: {
        male: getNumber(
          contents[0]?.children[4]?.children[0]?.children[3]?.children[1]?.children[0].content.trim()
        ),
        female: getNumber(
          contents[0]?.children[4]?.children[0]?.children[4]?.children[1]?.children[0].content.trim()
        ),
      },
      averageAge: {
        male: getNumber(
          contents[3]?.children[2]?.children[2]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.content.trim()
        ),
        female: getNumber(
          contents[3]?.children[2]?.children[2]?.children[0]?.children[1]?.children[1]?.children[0]?.children[0]?.content.trim()
        ),
      },
    },
    locations: {
      highestEmployment: [
        {
          name: contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[1]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[1]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[3]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[3]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[5]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[5]?.attributes[0]?.value.trim()
          ),
        },
      ],
      highestConcentrations: [
        {
          name: contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[7]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[7]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[9]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[9]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[11]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[11]?.attributes[0]?.value.trim()
          ),
        },
      ],
      highestPaying: [
        {
          name: contents[2]?.children[2]?.children[3]?.children[0]?.children[1]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[2]?.children[2]?.children[3]?.children[0]?.children[1]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[2]?.children[2]?.children[3]?.children[0]?.children[1]?.children[0]?.children[1]?.children[1]?.children[0]?.children[0]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[2]?.children[2]?.children[3]?.children[0]?.children[1]?.children[0]?.children[1]?.children[1]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[2]?.children[2]?.children[3]?.children[0]?.children[1]?.children[0]?.children[1]?.children[2]?.children[0]?.children[0]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[2]?.children[2]?.children[3]?.children[0]?.children[1]?.children[0]?.children[1]?.children[2]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
      ],
      relativelyHighConcentration: [
        {
          name: contents[2]?.children[2]?.children[4]?.children[0]?.children[1]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[2]?.children[2]?.children[4]?.children[0]?.children[1]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[2]?.children[2]?.children[4]?.children[0]?.children[1]?.children[0]?.children[1]?.children[1]?.children[0]?.children[0]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[2]?.children[2]?.children[4]?.children[0]?.children[1]?.children[0]?.children[1]?.children[1]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[2]?.children[2]?.children[4]?.children[0]?.children[1]?.children[0]?.children[1]?.children[2]?.children[0]?.children[0]?.children[0]?.content.trim(),
          geo: getGeo(
            contents[2]?.children[2]?.children[4]?.children[0]?.children[1]?.children[0]?.children[1]?.children[2]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
      ],
    },
    ethnicity: {
      mostCommon: [
        contents[3]?.children[2]?.children[1]?.children[0]?.children[1]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.content.trim(),
        contents[3]?.children[2]?.children[1]?.children[0]?.children[1]?.children[0]?.children[1]?.children[1]?.children[0]?.children[0]?.content.trim(),
        contents[3]?.children[2]?.children[1]?.children[0]?.children[1]?.children[0]?.children[1]?.children[2]?.children[0]?.children[0]?.content.trim(),
      ],
    },
    skills: {
      mostCommonMajors: [
        {
          name: contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.content.trim(),
          code: getCode(
            contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[0]?.children[1]?.children[1]?.children[0]?.children[0]?.children[0]?.content.trim(),
          code: getCode(
            contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[0]?.children[1]?.children[1]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[0]?.children[1]?.children[2]?.children[0]?.children[0]?.children[0]?.content.trim(),
          code: getCode(
            contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[0]?.children[1]?.children[2]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
      ],
      mostSpecializedMajors: [
        {
          name: contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[1]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.content.trim(),
          code: getCode(
            contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[1]?.children[1]?.children[0]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[1]?.children[1]?.children[1]?.children[0]?.children[0]?.children[0]?.content.trim(),
          code: getCode(
            contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[1]?.children[1]?.children[1]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
        {
          name: contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[1]?.children[1]?.children[2]?.children[0]?.children[0]?.children[0]?.content.trim(),
          code: getCode(
            contents[4]?.children[2]?.children[0]?.children[0]?.children[3]?.children[1]?.children[1]?.children[2]?.children[0]?.children[0]?.attributes[0]?.value.trim()
          ),
        },
      ],
    },
  };
  console.log(JSON.stringify(result, null, 2));
  return contents;
};
