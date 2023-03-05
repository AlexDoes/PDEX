import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const colors = {
  red: "\u001b[1;31m",
  green: "\u001b[1;32m",
  yellow: "\u001b[1;33m",
  blue: "\u001b[1;34m",
  magenta: "\u001b[1;35m",
  cyan: "\u001b[1;36m",
  white: "\u001b[1;37m",
  reset: "\u001b[0m",
  pink: "\u001b[1;38m",
  coral: "\u001b[1;39m",
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
  }
  newplant();

  async function fetchAndCreatePlant() {
    const plantData = await prisma.plant.findFirst({
      where: {
        name: "Bonsai",
      },
    });
    plantData
      ? await prisma.uniquePlant
          .create({
            data: {
              name: plantData.name,
              description: plantData.description,
              image: plantData.image,
              water: plantData.water,
              light: plantData.light,
              humidity: plantData.humidity,
              species: plantData.species,
              owner: {
                connect: {
                  id: newUser.id,
                },
              },
            },
          })
          .then((data) =>
            console.log(`${colors.green}Unique plant created ${colors.reset}`)
          )
      : console.log(`${colors.red}Plant species is not real ${colors.reset}`);
  }
  fetchAndCreatePlant();

  const allUsers = await prisma.user.findMany();
  const allPlants = await prisma.plant.findMany();
  const allUniquePlants = await prisma.uniquePlant.findMany();
  // console.log(allUsers);

  async function connectUniquePlantToCollection() {
    const newBonsai = await prisma.uniquePlant.findFirst({
      where: {
        ownerId: newUser.id,
      },
    });
    let ownerId;
    newBonsai && newBonsai.id
      ? console.log(
          `${colors.green}Unique plant found while searching for bonsai ${colors.reset}`
        )
      : console.log(
          `${colors.red}No unique plant found while searching for bonsai ${colors.reset}`
        );
    newBonsai && newBonsai.id
      ? (await prisma.plantCollection
          .create({
            data: {
              name: "Bonsai Collection",
              ownerId: newUser.id,
              plants: {
                connect: {
                  id: newBonsai.id,
                },
              },
            },
          })
          .then((data) => (ownerId = data.ownerId))) &&
        console.log(
          `${colors.cyan}Unique plant connected to collection, ${ownerId} ${colors.reset}`
        )
      : console.log(
          `${colors.red}No unique plant found while using connectUniquePlantToCollection ${colors.reset} `
        );
  }
  connectUniquePlantToCollection();

  const uniquePlantsOwnedByUser = await prisma.user.findMany({
    where: {
      id: newUser.id,
    },
  });

  const findUniquePlant = await prisma.uniquePlant.findMany({
    where: {
      ownerId: newUser.id,
    },
  });

  async function findCollection() {
    const promise = await prisma.plantCollection.findMany({
      where: {
        ownerId: newUser.id,
      },
    });
    console.log(promise);
  }
  findCollection();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
