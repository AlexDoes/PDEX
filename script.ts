import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.uniquePlant.deleteMany();
  await prisma.plant.deleteMany();
  await prisma.user.deleteMany();

  const newUser = await prisma.user.create({
    data: {
      name: "TashiSama",
      email: "TashiSama@pdex.org",
    },
  });

  const newPlant = await prisma.plant.create({
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

  async function fetchAndCreatePlant() {
    const plantData = await prisma.plant.findFirst({
      where: {
        name: "Bonsai",
      },
    });
    plantData
      ? await prisma.uniquePlant.create({
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
      : console.log("Plant species is not real");
  }
  await fetchAndCreatePlant();
  // await prisma.user.update({
  //   where: {
  //     id: newUser.id,
  //   },
  //   data: {
  //     uniquePlants: {
  //       where: {
  //         ownerId: newUser.id,
  //       },
  //     },
  //   },
  // });

  const allUsers = await prisma.user.findMany();
  const allPlants = await prisma.plant.findMany();
  const allUniquePlants = await prisma.uniquePlant.findMany();
  // console.log(allUsers, allPlants, allUniquePlants);
  // console.log(allUsers);

  const uniquePlantsOwnedByUser = await prisma.user.findMany({
    where: {
      id: newUser.id,
    },
  });

  // await prisma.user.update({
  //   where: {
  //     id: newUser.id,
  //   },
  //   data: {
  //     uniquePlants: {
  //       connect: {
  //         owner_id: newUser.id,
  //       },
  //     },
  //   },
  // });
  // update user with unique plant
  // const updatedUser = await prisma.user.update({
  //   where: {
  //     id: newUser.id,
  //   },
  //   data: {
  //     uniquePlants: {
  //       connect: {
  //         id: newUser.id,
  //       },
  //     },
  //   },
  // });
  // updatedUser;

  const addUniquePlantToUser = await prisma.user.update({
    where: {
      id: newUser.id,
    },
    data: {
      uniquePlants: {
        connect: {
          id: newUser.id,
        },
      },
    },
  });
  addUniquePlantToUser;

  const findUniquePlant = await prisma.uniquePlant.findMany({
    where: {
      ownerId: newUser.id,
    },
  });
  console.log(findUniquePlant);

  console.log(uniquePlantsOwnedByUser);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
