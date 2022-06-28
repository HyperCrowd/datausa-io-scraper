import { scrape } from './scraper';

const nonNumbers = /[^0-9\.\-]/g;

function getCode(code: string = '') {
  return code.replace('/profile/', '');
}

function getGeo(str: string = '') {
  return str.replace('/profile/geo/', '');
}


function getNumber(str: string = '') {
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
        parseFloat(str
          .replace('−', '-')
          .replace(' ', '')
          .replace('±', '')
          .substring(0, str.length - 1)) / 100
      );
    default:
      return parseFloat(str.replace('−', '-').replace(nonNumbers, ''));
  }
}

export const getOccupationData = async (fileName: string) => {
  const $ = await scrape(fileName);

  const result = {
    fileName,
    workforce: {
      size: getNumber(
        $('#Profile > div.Section.employment > div.section-topics > div.topic.tmap_ind.TextViz > div.topic-content > div.topic-stats > div:nth-child(1) > div.stat-value').text().trim()
      ),
      oneYearGrowth: {
        value: getNumber(
          $('#Profile > div.Section.employment > div.section-topics > div.topic.tmap_ind.TextViz > div.topic-content > div.topic-stats > div:nth-child(2) > div.stat-value').text().trim()
        ),
        errorRate: getNumber(
          $('#Profile > div.Section.employment > div.section-topics > div.topic.tmap_ind.TextViz > div.topic-content > div.topic-stats > div:nth-child(2) > div.stat-subtitle').text().trim()
        ),
      },
      mostlyEmployedBy: $('#Profile > div.Section.employment > div.section-body > div > div > div > p > a').map(function () {
        const attr = $(this).attr('href')
        if (attr.indexOf('/geo/') > -1) {
          return
        }

        return {
          name: $(this).text(),
          code: getCode(attr)
        }
      }).toArray(),
      averageSalary: getNumber(
        $('#Profile > div.Section.employment > div.section-topics > div.topic.wage_by_industry.TextViz > div.topic-content > div.topic-stats > div > div.stat-value').text()
      ),
      averageAge: getNumber(
        $('#Splash > div:nth-child(5) > div > div:nth-child(2) > div.stat-value').text()
      ),
    },
    gender: {
      count: {
        male: getNumber(
          $('#Profile > div.Section.demographics > div.section-topics > div.topic.sex.TextViz > div.topic-content > div.topic-stats > div:nth-child(1) > div.stat-value').text()
        ),
        female: getNumber(
          $('#Profile > div.Section.demographics > div.section-topics > div.topic.sex.TextViz > div.topic-content > div.topic-stats > div:nth-child(2) > div.stat-value').text()
        ),
      },
      averageSalary: {
        male: getNumber(
          $('#Splash > div:nth-child(5) > div > div:nth-child(4) > div.stat-value').text()
        ),
        female: getNumber(
          $('#Splash > div:nth-child(5) > div > div:nth-child(5) > div.stat-value').text()
        ),
      },
      averageAge: {
        male: getNumber(
          $('#Profile > div.Section.demographics > div.section-topics > div.topic.age_sex.TextViz > div.topic-content > div.topic-stats > div:nth-child(1) > div.stat-value').text()
        ),
        female: getNumber(
          $('#Profile > div.Section.demographics > div.section-topics > div.topic.age_sex.TextViz > div.topic-content > div.topic-stats > div:nth-child(2) > div.stat-value').text()
        ),
      },
    },
    locations: {
      highestPaying: [
        {
          name: $('#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(1) > div.stat-value > a').text(),
          geo: getGeo(
            $('#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(1) > div.stat-value > a').attr('href')
          ),
        },
        {
          name: $('#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(2) > div.stat-value > a').text(),
          geo: getGeo(
            $('#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(2) > div.stat-value > a').attr('href')
          ),
        },
        {
          name: $('#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(3) > div.stat-value > a').text(),
          geo: getGeo(
            $('#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(3) > div.stat-value > a').attr('href')
          ),
        },
      ],
      relativelyHighConcentration: [
        {
          name: $('#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(1) > div.stat-value > a').text(),
          geo: getGeo(
            $('#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(1) > div.stat-value > a').attr('href')
          ),
        },
        {
          name: $('#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(2) > div.stat-value > a').text(),
          geo: getGeo(
            $('#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(2) > div.stat-value > a').attr('href')
          ),
        },
        {
          name: $('#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(3) > div.stat-value > a').text(),
          geo: getGeo(
            $('#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(3) > div.stat-value > a').attr('href')
          ),
        },
      ],
    },
    ethnicity: {
      mostCommon: [
        $('#Profile > div.Section.demographics > div.section-topics > div.topic.ethnicity.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(1) > div.stat-value').text(),
        $('#Profile > div.Section.demographics > div.section-topics > div.topic.ethnicity.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(2) > div.stat-value').text(),
        $('#Profile > div.Section.demographics > div.section-topics > div.topic.ethnicity.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(3) > div.stat-value').text(),
      ],
    },
    skills: {
      mostCommonMajors: [
        {
          name: $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(1) > div.stat-value > a').text(),
          code: getCode(
            $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(1) > div.stat-value > a').attr('href')
          ),
        },
        {
          name: $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(2) > div.stat-value > a').text(),
          code: getCode(
            $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(1) > div.stat-value > a').attr('href')
          ),
        },
        {
          name: $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(3) > div.stat-value > a').text(),
          code: getCode(
            $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(3) > div.stat-value > a').attr('href')
          ),
        },
      ],
      mostSpecializedMajors: [
        {
          name: $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(1) > div.stat-value > a').text(),
          code: getCode(
            $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(1) > div.stat-value > a').attr('href')
          ),
        },
        {
          name: $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(2) > div.stat-value > a').text(),
          code: getCode(
            $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(2) > div.stat-value > a').attr('href')
          ),
        },
        {
          name: $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(3) > div.stat-value > a').text(),
          code: getCode(
            $('#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(3) > div.stat-value > a').attr('href')
          ),
        },
      ],
    },
  };

  return result;
};


/*
export const oldGetOccupationData = async (fileName: string) => {
  const json = await scrape(fileName);

  const contents =
    json[2].children[2].children[1].children[0].children[0].children[0]
      .children[1].children;

  const result = {
    fileName,
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
            getChild([1, 1, 0, 0, 2, 0, 11, 0], contents, 'value')
            // contents[1]?.children[1]?.children[0]?.children[0]?.children[2]?.children[0]?.children[11]?.attributes[0]?.value.trim()
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
          // name: contents[2]?.children[2]?.children[4]?.children[0]?.children[1]?.children[0]?.children[1]?.children[0]?.children[0]?.children[0]?.children[0]?.content.trim(),
          name: getChild([2, 2, 4, 0, 1, 0, 1, 0, 0, 0, 0], contents, 'content'),
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

  return result;
};
*/