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
import { hash } from "bcrypt";

async function main() {
  try {
    await prisma.usersToUniquePlants.deleteMany();
    await prisma.uniquePlantsToCollections.deleteMany();
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

  const password = await hash("tashisamatashisama", 12);

  const newUser = await prisma.user.create({
    data: {
      id: "1",
      name: "TashiSama",
      email: "tashisama@pdex.org",
      password: password,
    },
  });

  const newUser2 = await prisma.user.create({
    data: {
      id: "2",
      name: "MarcoSama",
      email: "MarcoSama@pdex.org",
      password: password,
    },
  });

  const newUsers = await prisma.user.createMany({
    data: [
      {
        id: "3",
        name: "EmilySama",
        email: "EmilySama@pdex.org",
      },
      {
        id: "4",
        name: "DavidSama",
        email: "DavidSama@pdex.org",
      },
    ],
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
    const users: string[] = [];
    const allUsers = await prisma.user
      .findMany({
        where: {
          role: "USER",
        },
      })
      .then((people) => people.forEach((person) => users.push(person.name)));
    console.log(`${colors.lightBlue}Users:[ ${users} ] ${colors.reset}`);
  }

  async function newplant() {
    try {
      await prisma.plant.createMany({
        data: [
          {
            description:
              "Bonsai is a Japanese art form using cultivation techniques to produce small trees in containers that mimic the shape and scale of full size trees.",
            image:
              "https://images.unsplash.com/photo-1599598177991-ec67b5c37318?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",

            water: "once a week",
            light: "direct sunlight",
            species: "Bonsai",
            name: "Bonsai",
          },
          {
            description:
              "Aloe vera is a succulent plant species of the genus Aloe. An evergreen perennial, it originates from the Arabian Peninsula, but grows wild in tropical, semi-tropical, and arid climates around the world.",
            image:
              "https://images.unsplash.com/photo-1629426956597-1f94bac22333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            water: "once a week",
            light: "direct sunlight",
            species: "Aloe Vera",
            name: "Aloe Vera",
          },
          {
            description:
              "The snake plant, also known as mother-in-law's tongue or Saint George's sword, is a flowering plant species in the family Asparagaceae, native to tropical West Africa.",
            image:
              "https://plus.unsplash.com/premium_photo-1673969608395-9281e5e4395f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=708&q=80",
            water: "once a week",
            light: "direct sunlight",
            species: "Snake Plant",
            name: "Snake Plant",
          },
        ],
      });
      console.log(`${colors.yellow}New plants created ${colors.reset}`);
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

    const plantData3 = await prisma.plant.findFirst({
      where: {
        name: "Snake Plant",
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
              ownedBy: {
                connect: {
                  id:
                    plantEntry.name === "Snake Plant"
                      ? newUser2.id
                      : newUser.id,
                },
              },
            },
          })
          .then((data) => {
            owner = data.ownerId;
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
    await createUniquePlant(plantData3);
  }

  async function connectUniquePlantToCollection() {
    const uniquePlants = await prisma.uniquePlant.findMany({});

    const userCollection = await prisma.plantCollection.create({
      data: {
        name: `${newUser.name}'s Collection`,
        ownerId: newUser.id,
      },
    });

    const userCollection2 = await prisma.plantCollection.create({
      data: {
        name: `${newUser2.name}'s Collection`,
        ownerId: newUser2.id,
      },
    });

    console.log([userCollection.id, userCollection2.id]);

    for (let plant of uniquePlants) {
      try {
        const info = await prisma.uniquePlantsToCollections.create({
          data: {
            uniquePlantId: plant.id,
            plantCollectionId:
              plant.ownerId === newUser.id
                ? userCollection.id
                : userCollection2.id,
          },
        });
        console.log(
          `${colors.green}${plant.name} connected to collection '${colors.salmon}${info.plantCollectionId}' ${colors.reset}`
        );
      } catch (error) {
        console.log(`${colors.red}error ${colors.reset}`);
      }
    }
    // console.log(await prisma.uniquePlantsToCollections.findMany());
  }
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

    // query for all uniquePlants with promise[0].id as a collectionId

    const collectionContents = await prisma.uniquePlant.findMany({
      where: {
        CollectionsPartOf: {
          some: {
            plantCollectionId: promise[0].id,
          },
        },
      },
    });

    await console.log(
      "\x1b[35m%s\x1b[0m",
      "PLANT COLLECTION CONTENTS:",
      collectionContents.length
    );
  }

  async function addPlantToUsersFavorites() {
    const userFavoriting = (await prisma.user.findFirst({
      where: {
        name: "MarcoSama",
      },
    })) || { id: "2" };

    const plantToFavorite = await prisma.uniquePlant.findMany({
      where: {
        NOT: {
          ownerId: userFavoriting.id,
        },
      },
    });

    const favoritePlant = await prisma.usersToUniquePlants.createMany({
      data: [
        {
          userId: userFavoriting.id,
          uniquePlantId: plantToFavorite[0].id,
        },
        {
          userId: userFavoriting.id,
          uniquePlantId: plantToFavorite[1].id,
        },
      ],
    });
    const res: string[] = [];
    const fetchFavoritedBy = await prisma.uniquePlant
      .findMany({
        where: {
          FavoritedBy: {
            some: {
              userId: userFavoriting.id,
            },
          },
        },
      })
      .then((data) => {
        data.forEach((plant) => {
          res.push(plant.name);
        });
      });

    console.log(res);
  }

  async function run() {
    // await findAllUsers(); // THIS WORKS FOR NOW
    await findAllUsers();
    await newplant();
    await fetchAndCreatePlant();
    await connectUniquePlantToCollection();
    await findCollection();
    await addPlantToUsersFavorites();
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
