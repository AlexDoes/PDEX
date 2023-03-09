import collection from "@/pages/collections";
import { PrismaClient } from "@prisma/client";
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

async function main() {
  try {
    await prisma.plantCollection.deleteMany();
    console.log(`${colors.cyan}Resetting plant collection`);
    await prisma.uniquePlant.deleteMany();
    console.log(`Resetting unique plant`);
    await prisma.plant.deleteMany();
    console.log("Resetting plant");
    await prisma.user.deleteMany();
    console.log("Resetting user");
    console.log(`All data deleted`);
    console.log(`${colors.reset}`);
  } catch (error) {
    console.log(error);
  }

  const newUser = await prisma.user.create({
    data: {
      id: "1",
      name: "TashiSama",
      email: "TashiSama@pdex.org",
    },
  });

  const newUser2 = await prisma.user.create({
    data: {
      id: "2",
      name: "MarcoSama",
      email: "MarcoSama@pdex.org",
    },
  });

  newUser
    ? console.log(
        `${colors.pink}${newUser.name} is now created ${colors.reset}`
      )
    : "no user created";

  newUser2
    ? console.log(
        `${colors.pink}${newUser2.name} is now created ${colors.reset}`
      )
    : "no user created";

  async function findAllUsers() {
    const allUsers = await prisma.user.findMany({
      where: {
        role: "USER",
      },
    });
    console.log(allUsers);
  }

  async function newplant() {
    try {
      await prisma.plant.create({
        data: {
          description:
            "Bonsai is a Japanese art form using cultivation techniques to produce small trees in containers that mimic the shape and scale of full size trees.",
          image:
            "https://www.bonsaiempire.com/wp-content/uploads/2019/01/How-to-Prune-Bonsai-Tree-1.jpg",
          water: "once a week",
          light: "direct sunlight",
          humidity: "high",
          species: "Bonsai",
          name: "Bonsai",
        },
      });
      console.log(`${colors.green}New plant created ${colors.reset}`);
    } catch (error) {
      console.log(`${colors.red}error ${colors.reset}`);
    }

    try {
      await prisma.plant.create({
        data: {
          description:
            "Aloe vera is a succulent plant species of the genus Aloe. An evergreen perennial, it originates from the Arabian Peninsula, but grows wild in tropical, semi-tropical, and arid climates around the world.",
          image:
            "https://www.gardeningknowhow.com/wp-content/uploads/2019/04/aloe-vera-plant.jpg",
          water: "once a week",
          light: "direct sunlight",
          humidity: "high",
          species: "Aloe Vera",
          name: "Aloe Vera",
        },
      });
      console.log(`${colors.green}New plant2 created ${colors.reset}`);
    } catch (error) {
      console.log(`${colors.red}error ${colors.reset}`);
    }
  }

  async function fetchAndCreatePlant() {
    const plantData = await prisma.plant.findFirst({
      where: {
        name: "Bonsai",
      },
    });
    const plantData2 = await prisma.plant.findFirst({
      where: {
        name: "Aloe Vera",
      },
    });

    async function createUniquePlant(plantEntry: any) {
      let owner;
      try {
        await prisma.uniquePlant
          .create({
            data: {
              name: plantEntry.name,
              description: plantEntry.description,
              image: plantEntry.image,
              water: plantEntry.water,
              light: plantEntry.light,
              humidity: plantEntry.humidity,
              species: plantEntry.species,
              owner: {
                connect: {
                  id: newUser.id,
                },
              },
            },
          })
          .then((data) => {
            owner = newUser.name;
            // console.log({ madeData: data });
          });
        console.log(
          `${colors.green}New unique ${plantEntry.name} created by ${owner}${colors.reset}`
        );
      } catch (error) {
        console.log(`${colors.red}error ${colors.reset}`);
      }
    }
    await createUniquePlant(plantData);
    await createUniquePlant(plantData2);
  }

  // async function fetchAndCreatePlant() {

  //   const plantData = await prisma.plant.findFirst({
  //     where: {
  //       name: "Bonsai",
  //     },
  //   });
  //   const plantData2 = await prisma.plant.findFirst({
  //     where: {
  //       name: "Aloe Vera",
  //     },
  //   });

  //   const createUniquePlant = (plantEntry:any) => {
  //     try {
  //       prisma.uniquePlant.create({
  //         data: {
  //           name: plantEntry.name,
  //           description: plantEntry.description,
  //           image: plantEntry.image,
  //           water: plantEntry.water,
  //           light: plantEntry.light,
  //           humidity: plantEntry.humidity,
  //           species: plantEntry.species,
  //           owner: {
  //             connect: {
  //               id: newUser.id,
  //             },
  //           },
  //         },
  //       });
  //       console.log(`${colors.olive}Unique plant created ${colors.reset}`);
  //     } catch {
  //       console.log(`${colors.red}Plant species is not real ${colors.reset}`);
  //     }
  //   };
  //   createUniquePlant(plantData);
  //   createUniquePlant(plantData2);
  // }

  // plantData
  //   ? await prisma.uniquePlant
  //       .create({
  //         data: {
  //           name: plantData.name,
  //           description: plantData.description,
  //           image: plantData.image,
  //           water: plantData.water,
  //           light: plantData.light,
  //           humidity: plantData.humidity,
  //           species: plantData.species,
  //           owner: {
  //             connect: {
  //               id: newUser.id,
  //             },
  //           },
  //         },
  //       })
  //       .then((data) =>
  //         console.log(`${colors.olive}Unique plant created ${colors.reset}`)
  //       )
  //   : console.log(`${colors.red}Plant species is not real ${colors.reset}`);
  // }

  async function connectUniquePlantToCollection() {
    let result;

    const uniquePlants = await prisma.uniquePlant.findMany({
      where: {
        ownerId: newUser.id,
      },
    });

    const userCollection = await prisma.plantCollection.create({
      data: {
        name: `${newUser.name}'s Collection`,
        ownerId: newUser.id,
      },
    });

    // console.log({ unique: uniquePlants });

    for (let plant of uniquePlants) {
      try {
        result = await prisma.plantCollection.update({
          where: {
            id: userCollection.id,
          },
          data: {
            plants: {
              connect: {
                id: plant.id,
              },
            },
          },
        });
        console.log(
          `${colors.green}${plant.name} connected to collection '${colors.salmon}${userCollection.name}' ${colors.reset}`
        );
      } catch (error) {
        console.log(`${colors.red}error ${colors.reset}`);
      }
    }

    // const newBonsai = await prisma.uniquePlant.findFirst({
    //   where: {
    //     ownerId: newUser.id,
    //   },
    // });

    // const newAloe = await prisma.uniquePlant.findFirst({
    //   where: {
    //     name: "Aloe Vera",
    //     ownerId: newUser.id,
    //   },
    // });
    // console.log(newAloe?.species);

    // newBonsai && newBonsai.id
    //   ? console.log(
    //       `${colors.orange}Unique Plant data found while searching for bonsai ${colors.reset}`
    //     )
    //   : console.log(
    //       `${colors.red}No unique plant data found while searching for bonsai ${colors.reset}`
    //     );

    // newBonsai && newBonsai.id
    //   ? (await prisma.plantCollection
    //       .create({
    //         data: {
    //           name: "Bonsai Collection",
    //           ownerId: newUser.id,
    //           plants: {
    //             connect: {
    //               id: newBonsai.id,
    //             },
    //           },
    //         },
    //       })
    //       .then((data) => (result = data.name))) &&
    //     console.log(
    //       `${colors.cyan}Unique plant connected to collection, ${result} ${colors.reset}`
    //     )
    //   : console.log(
    //       `${colors.red}No unique plant found while using connectUniquePlantToCollection ${colors.reset} `
    //     );
  }

  // const uniquePlantsOwnedByUser = await prisma.user.findMany({
  //   where: {
  //     id: newUser.id,
  //   },
  // });

  // const findUniquePlant = await prisma.uniquePlant.findMany({
  //   where: {
  //     ownerId: newUser.id,
  //   },
  // });

  async function findCollection() {
    const promise = await prisma.plantCollection.findMany({
      where: {
        ownerId: newUser.id,
      },
    });
    const collectionContents = await prisma.uniquePlant.findMany({
      where: {
        collectionId: promise[0].id,
      },
    });
    console.log(
      "\x1b[35m%s\x1b[0m",
      "PLANT COLLECTION CONTENTS:",
      collectionContents.length
    );
  }

  async function addPlantToUsersFavorites() {
    const userFavoriting = await prisma.user.findFirst({
      where: {
        name: "MarcoSama",
      },
    });

    const plantToFavorite = await prisma.uniquePlant.findFirst({
      where: {
        name: "Bonsai",
      },
    });
  }

  async function run() {
    // await findAllUsers(); // THIS WORKS FOR NOW
    await newplant();
    await fetchAndCreatePlant();
    await connectUniquePlantToCollection();
    await findCollection();
  }
  run();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
