import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
const prisma = new PrismaClient();
const colors = {
  //ansi color codes for console.log
  black: "\u001b[38;5;0m",
  gray: "\u001b[38;5;8m",
  darkGray: "\u001b[38;5;240m",
  lightGray: "\u001b[38;5;250m",
  white: "\u001b[38;5;7m",

  red: "\u001b[38;5;1m",
  brightRed: "\u001b[38;5;9m",

  green: "\u001b[38;5;2m",
  brightGreen: "\u001b[38;5;10m",

  yellow: "\u001b[38;5;3m",
  brightYellow: "\u001b[38;5;11m",

  blue: "\u001b[38;5;4m",
  brightBlue: "\u001b[38;5;12m",
  deepBlue: "\u001b[38;5;18m",

  magenta: "\u001b[38;5;5m",
  brightMagenta: "\u001b[38;5;13m",

  cyan: "\u001b[1;36m",
  brightCyan: "\u001b[38;5;14m",

  purple: "\u001b[38;5;93m",

  pink: "\u001b[38;5;206m",
  lightPink: "\u001b[38;5;225m",

  orange: "\u001b[38;5;208m",
  redOrange: "\u001b[38;5;202m",
  yellowOrange: "\u001b[38;5;214m",

  limeGreen: "\u001b[38;5;46m",
  greenYellow: "\u001b[38;5;154m",

  skyBlue: "\u001b[38;5;117m",
  lightBlue: "\u001b[38;5;111m",

  brown: "\u001b[38;5;130m",
  tan: "\u001b[38;5;180m",
  salmon: "\u001b[38;5;174m",

  coral: "\u001b[38;5;209m",
  olive: "\u001b[38;5;58m",
  reset: "\u001b[0m",
};

interface Entry {
  id: number;
  name: string;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  cycle: string;
  sunlight: string[];
  watering: string;
  default_image: any;
}

interface PlantEntry {
  name: string;
  alternative_names?: string[];
  id: number[];
  scientific_name: string[];
  distinct_name: any;
}

interface PlantMap {
  [key: string]: PlantEntry;
  [id: number]: PlantEntry;
}

const entryMap: PlantMap = {};

// async function main() {
//   const entries: Entry[] = JSON.parse(
//     fs.readFileSync("public/data/page1.json", "utf8")
//   ).data;

//   for (const entry of entries) {
//     try {
//       await prisma.plant
//         .upsert({
//           where: {
//             name: entry.common_name,
//           },
//           update: {},
//           create: {
//             name: entry.common_name,
//             common_name: entry.common_name,
//             scientific_name: entry.scientific_name || [],
//             other_names: entry.other_name || [],
//             light: entry.light,
//             water: entry.watering,
//             default_image: entry.default_image
//               ? entry.default_image.medium_url
//               : "",
//           },
//         })
//         .then((res) => {
//           console.log(colors.green, res);
//         });
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

function toTitleCase(str: string) {
  const res = str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      const target = word[0] == "'" ? word[1] : word[0];
      return word.replace(target, target.toUpperCase());
    })
    .join(" ");
  //   console.log(res);
  return res;
}

function arraytoTitleCase(arr: string[]) {
  return arr.map((word) => toTitleCase(word));
}

async function upsertData(): Promise<void> {
  let num = 0;
  const logFile = `public/logger.txt`;
  const speciesList = "public/speciesList.txt";
  const speciesJSON = "public/species.json";
  fs.writeFileSync(logFile, "", "utf-8"); // reset log file
  fs.writeFileSync(speciesList, "", "utf-8"); // reset species list
  fs.writeFileSync(speciesJSON, "", "utf-8"); // reset species list
  const set = new Set();

  for (let i = 1; i <= 200; i++) {
    const fileName = `page${i}.json`;
    const fileContents = fs.readFileSync(`public/data/${fileName}`, "utf8");
    const entries: Entry[] = JSON.parse(fileContents).data;
    for (const entry of entries) {
      set.add(toTitleCase(entry.common_name));
      entry.scientific_name?.forEach((word) => {
        set.add(toTitleCase(word));
      });
      entry.other_name?.forEach((word) => {
        set.add(toTitleCase(word));
      });

      entryMap[entry.scientific_name[0]] = {
        name: toTitleCase(entry.common_name),
        alternative_names: entry.other_name
          ? arraytoTitleCase(entry.other_name)
          : [],
        id: [entry.id],
        scientific_name: entry.scientific_name,
        distinct_name: true,
      };

      entry.other_name?.forEach((word) => {
        if (entryMap[toTitleCase(word)]) {
          if (entryMap[toTitleCase(word)].scientific_name) {
            entryMap[toTitleCase(word)].scientific_name.push(
              entry.scientific_name[0]
            );
            entryMap[toTitleCase(word)].id.push(entry.id);
          } else {
            entryMap[toTitleCase(word)].scientific_name = [
              entry.scientific_name[0],
            ];
          }
        } else {
          entryMap[toTitleCase(word)] = {
            scientific_name: [entry.scientific_name[0]],
            id: [entry.id],
            name: toTitleCase(word),
            distinct_name: false,
          };
        }
      });

      //   try {
      //     await prisma.plant
      //       .upsert({
      //         where: {
      //           name: entry.common_name,
      //         },
      //         update: {
      //           species: entry.scientific_name[0],
      //           light: entry.sunlight[0],
      //         },
      //         create: {
      //           name: entry.common_name,
      //           common_name: entry.common_name,
      //           scientific_name: entry.scientific_name || [],
      //           other_names: entry.other_name || [],
      //           light: entry.sunlight[0],
      //           water: entry.watering,
      //           default_image: entry.default_image
      //             ? entry.default_image.medium_url
      //             : "",
      //         },
      //       })
      //       .then((res) => {
      //         const logMessage = `Inserted ${
      //           res.name
      //         } into the database : ${(num += 1)} \n`;
      //         fs.appendFileSync(`public/logger.txt`, logMessage, "utf-8");
      //         console.log(colors.green, res);
      //       });
      //   } catch (e) {
      //     console.log(e);
      //   }
    }
  }

  const sortedMap = Object.keys(entryMap).sort((a, b) => {
    if (entryMap[a].distinct_name == entryMap[b].distinct_name) {
      return a.localeCompare(b);
    } else {
      return entryMap[b].distinct_name - entryMap[a].distinct_name;
    }
  });

  const sortedObj: PlantMap = {};
  sortedMap.forEach((key) => {
    sortedObj[key] = entryMap[key];
  });

  fs.writeFileSync(speciesList, [...set].join("\n"), "utf-8");
  fs.writeFileSync(speciesJSON, JSON.stringify(sortedObj), "utf-8");
  const speciesCount = await prisma.plant.count();
  console.log(colors.green, "Unique species", speciesCount);
  console.log(colors.red, "Unique names", set.size);
}

upsertData()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
