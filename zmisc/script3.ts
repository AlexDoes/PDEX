import * as fs from "fs";

interface Entry {
  name: string;
  alternative_names?: string[];
}

interface PlantMap {
  [key: string]: Entry;
}

function createEntryMap(): PlantMap {
  const entryMap: PlantMap = {};

  for (const entry of entries) {
    // Add main name entry
    entryMap[entry.name] = {
      name: entry.name,
      alternative_names: entry.alternative_names || [],
    };

    // Add alternative name entries
    if (entry.alternative_names) {
      for (const altName of entry.alternative_names) {
        entryMap[altName] = {
          name: entry.name,
          alternative_names: [],
        };
      }
    }
  }

  return entryMap;
}

createEntryMap();
