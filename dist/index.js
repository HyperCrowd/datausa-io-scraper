var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  main: () => main
});
module.exports = __toCommonJS(src_exports);

// src/scraper.ts
var import_promises = require("fs/promises");
var cheerio = __toESM(require("cheerio"));
var scrape = async (filePath) => {
  const dom = (await (0, import_promises.readFile)(filePath)).toString();
  return cheerio.load(dom);
};

// src/occupations.ts
var nonNumbers = /[^0-9\.\-]/g;
function getCode(code = "") {
  return code.replace("/profile/", "");
}
function getGeo(str = "") {
  return str.replace("/profile/geo/", "");
}
function getNumber(str = "") {
  const last = str[str.length - 1];
  switch (last) {
    case "K":
    case "k":
      return parseFloat(str.substring(0, str.length - 1)) * 1e3;
    case "M":
    case "m":
      return parseFloat(str.substring(0, str.length - 1)) * 1e6;
    case "%":
      return parseFloat(str.replace("\u2212", "-").replace(" ", "").replace("\xB1", "").substring(0, str.length - 1)) / 100;
    default:
      return parseFloat(str.replace("\u2212", "-").replace(nonNumbers, ""));
  }
}
var getOccupationData = async (fileName) => {
  const $ = await scrape(fileName);
  const result = {
    fileName,
    workforce: {
      size: getNumber($("#Profile > div.Section.employment > div.section-topics > div.topic.tmap_ind.TextViz > div.topic-content > div.topic-stats > div:nth-child(1) > div.stat-value").text().trim()),
      oneYearGrowth: {
        value: getNumber($("#Profile > div.Section.employment > div.section-topics > div.topic.tmap_ind.TextViz > div.topic-content > div.topic-stats > div:nth-child(2) > div.stat-value").text().trim()),
        errorRate: getNumber($("#Profile > div.Section.employment > div.section-topics > div.topic.tmap_ind.TextViz > div.topic-content > div.topic-stats > div:nth-child(2) > div.stat-subtitle").text().trim())
      },
      mostlyEmployedBy: $("#Profile > div.Section.employment > div.section-body > div > div > div > p > a").map(function() {
        const attr = $(this).attr("href");
        if (attr.indexOf("/geo/") > -1) {
          return;
        }
        return {
          name: $(this).text(),
          code: getCode(attr)
        };
      }).toArray(),
      averageSalary: getNumber($("#Profile > div.Section.employment > div.section-topics > div.topic.wage_by_industry.TextViz > div.topic-content > div.topic-stats > div > div.stat-value").text()),
      averageAge: getNumber($("#Splash > div:nth-child(5) > div > div:nth-child(2) > div.stat-value").text())
    },
    gender: {
      count: {
        male: getNumber($("#Profile > div.Section.demographics > div.section-topics > div.topic.sex.TextViz > div.topic-content > div.topic-stats > div:nth-child(1) > div.stat-value").text()),
        female: getNumber($("#Profile > div.Section.demographics > div.section-topics > div.topic.sex.TextViz > div.topic-content > div.topic-stats > div:nth-child(2) > div.stat-value").text())
      },
      averageSalary: {
        male: getNumber($("#Splash > div:nth-child(5) > div > div:nth-child(4) > div.stat-value").text()),
        female: getNumber($("#Splash > div:nth-child(5) > div > div:nth-child(5) > div.stat-value").text())
      },
      averageAge: {
        male: getNumber($("#Profile > div.Section.demographics > div.section-topics > div.topic.age_sex.TextViz > div.topic-content > div.topic-stats > div:nth-child(1) > div.stat-value").text()),
        female: getNumber($("#Profile > div.Section.demographics > div.section-topics > div.topic.age_sex.TextViz > div.topic-content > div.topic-stats > div:nth-child(2) > div.stat-value").text())
      }
    },
    locations: {
      highestPaying: [
        {
          name: $("#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(1) > div.stat-value > a").text(),
          geo: getGeo($("#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(1) > div.stat-value > a").attr("href"))
        },
        {
          name: $("#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(2) > div.stat-value > a").text(),
          geo: getGeo($("#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(2) > div.stat-value > a").attr("href"))
        },
        {
          name: $("#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(3) > div.stat-value > a").text(),
          geo: getGeo($("#Profile > div.Section.employment > div.section-topics > div.topic.wage_locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(3) > div.stat-value > a").attr("href"))
        }
      ],
      relativelyHighConcentration: [
        {
          name: $("#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(1) > div.stat-value > a").text(),
          geo: getGeo($("#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(1) > div.stat-value > a").attr("href"))
        },
        {
          name: $("#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(2) > div.stat-value > a").text(),
          geo: getGeo($("#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(2) > div.stat-value > a").attr("href"))
        },
        {
          name: $("#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(3) > div.stat-value > a").text(),
          geo: getGeo($("#Profile > div.Section.employment > div.section-topics > div.topic.locations.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(3) > div.stat-value > a").attr("href"))
        }
      ]
    },
    ethnicity: {
      mostCommon: [
        $("#Profile > div.Section.demographics > div.section-topics > div.topic.ethnicity.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(1) > div.stat-value").text(),
        $("#Profile > div.Section.demographics > div.section-topics > div.topic.ethnicity.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(2) > div.stat-value").text(),
        $("#Profile > div.Section.demographics > div.section-topics > div.topic.ethnicity.TextViz > div.topic-content > div.topic-stats > div > ol > li:nth-child(3) > div.stat-value").text()
      ]
    },
    skills: {
      mostCommonMajors: [
        {
          name: $("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(1) > div.stat-value > a").text(),
          code: getCode($("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(1) > div.stat-value > a").attr("href"))
        },
        {
          name: $("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(2) > div.stat-value > a").text(),
          code: getCode($("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(1) > div.stat-value > a").attr("href"))
        },
        {
          name: $("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(3) > div.stat-value > a").text(),
          code: getCode($("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(1) > ol > li:nth-child(3) > div.stat-value > a").attr("href"))
        }
      ],
      mostSpecializedMajors: [
        {
          name: $("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(1) > div.stat-value > a").text(),
          code: getCode($("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(1) > div.stat-value > a").attr("href"))
        },
        {
          name: $("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(2) > div.stat-value > a").text(),
          code: getCode($("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(2) > div.stat-value > a").attr("href"))
        },
        {
          name: $("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(3) > div.stat-value > a").text(),
          code: getCode($("#Profile > div.Section.education > div.section-topics > div > div.topic-content > div.topic-stats > div:nth-child(2) > ol > li:nth-child(3) > div.stat-value > a").attr("href"))
        }
      ]
    }
  };
  return result;
};

// src/index.ts
async function main(filePath = process.argv[2]) {
  const data = await getOccupationData(filePath);
  console.log(JSON.stringify(data, null, 2));
  return data;
}
main();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
//# sourceMappingURL=index.js.map