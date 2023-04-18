import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("tashisamatashisama", 12);
  const user = await prisma.user.upsert({
    where: { email: "dummyuser3@pdex.com" },
    update: {},
    create: {
      email: "DummyUser3@pdex.com",
      name: "Tashisama",
      id: "12",
      password,
    },
  });

  const userAlex = await prisma.user.upsert({
    where: { email: "alex@pdex.com" },
    update: {},
    create: {
      email: "alex@pdex.com",
      name: "Alex Wong",
      password: password,
      id: "1",
    },
  });

  const password2 = await hash("tashisama", 12);
  const user2 = await prisma.user.upsert({
    where: { email: "tashi@pdex.com" },
    update: {},
    create: {
      email: "tashi@pdex.com",
      name: "Tashi Sangpo",
      password: password2,
      id: "3",
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "marco@pdex.com" },
    update: {},
    create: {
      email: "marco@pdex.com",
      name: "Marco Countryman",
      password: password2,
      id: "4",
    },
  });

  const user4 = await prisma.user.upsert({
    where: { email: "steven@pdex.com" },
    update: {},
    create: {
      email: "steven@pdex.com",
      name: "Steven Sookhai",
      password: password2,
      id: "2",
    },
  });

  const plant = await prisma.plant.upsert({
    where: { name: "Aloe Vera" },
    update: {},
    create: {
      name: "Aloe Vera",
      description: "Aloe Vera is a succulent plant species of the genus Aloe.",
      image: "https://i.imgur.com/1ZQ1Z1K.jpg",
      water: "once a week",
      light: "direct sunlight",
      species: "Aloe Vera",
    },
  });

  const plant2 = await prisma.plant.upsert({
    where: { name: "Snake Plant" },
    update: {},
    create: {
      name: "Snake Plant",
      description:
        "Snake Plant is a succulent plant species of the genus Aloe.",
      image: "https://i.imgur.com/1ZQ1Z1K.jpg",
      water: "once a week",
      light: "direct sunlight",
      species: "Snake Plant",
    },
  });

  const plant3 = await prisma.plant.upsert({
    where: { name: "Bonsai" },
    update: {},
    create: {
      name: "Bonsai",
      description: "Bonsai is a succulent plant species of the genus Aloe.",
      image: "https://i.imgur.com/1ZQ1Z1K.jpg",
      water: "once a week",
      light: "direct sunlight",
      species: "Bonsai",
    },
  });

  const id = "1";

  const uniquePlant1 = await prisma.uniquePlant.upsert({
    where: { id: id },
    update: {},
    create: {
      name: "Alex's Aloe Vera",
      description: "Aloe Vera is a succulent plant species of the genus Aloe.",
      image: "https://i.imgur.com/1ZQ1Z1K.jpg",
      water: "once a week",
      light: "direct sunlight",
      species: "Aloe Vera",
      ownedBy: {
        connect: {
          id: "1",
        },
      },
    },
  });

  await prisma.uniquePlant.createMany({
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
        ownerId: "3",
        id: "BonsaiSeed",
      },
      {
        ownerId: "3",
        description:
          "Aloe vera is a succulent plant species of the genus Aloe. An evergreen perennial, it originates from the Arabian Peninsula, but grows wild in tropical, semi-tropical, and arid climates around the world.",
        image:
          "https://images.unsplash.com/photo-1629426956597-1f94bac22333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        water: "once a week",
        light: "direct sunlight",
        species: "Aloe Vera",
        name: "Aloe Vera",
        id: "AloeSeed",
      },
      {
        ownerId: "3",
        description:
          "The snake plant, also known as mother-in-law's tongue or Saint George's sword, is a flowering plant species in the family Asparagaceae, native to tropical West Africa.",
        image:
          "https://plus.unsplash.com/premium_photo-1673969608395-9281e5e4395f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=708&q=80",
        water: "once a week",
        light: "direct sunlight",
        species: "Snake Plant",
        name: "Snake Plant",
        id: "SnakeSeed",
      },
    ],
  });

  const plantCollection = await prisma.plantCollection.upsert({
    where: { id: id },
    update: {},
    create: {
      name: `Tashi's Collection`,
      ownerId: "3",
      plantContents: {
        connect: [
          {
            id: "AloeSeed",
          },
          {
            id: "SnakeSeed",
          },
          {
            id: "BonsaiSeed",
          },
        ],
      },
    },
  });

  const plantCollectionsSeeding = await prisma.plantCollection.createMany({
    data: [
      {
        name: "Marco's Collection",
        ownerId: "3",
      },
      {
        name: "Steven's Collection",
        ownerId: "3",
      },
    ],
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
