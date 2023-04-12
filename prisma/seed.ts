import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("tashisamatashisama", 12);
  const user = await prisma.user.upsert({
    where: { email: "DummyUser3@pdex.com" },
    update: {},
    create: {
      email: "DummyUser3@pdex.com",
      name: "Tashi sucks3",
      password,
    },
  });

  const password2 = await hash("tashiisawaifu", 12);
  const user2 = await prisma.user.upsert({
    where: { email: "Tashi@pdex.com" },
    update: {},
    create: {
      email: "Tashi@pdex.com",
      name: "Tashi Sangpo",
      password: password2,
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

  const uniquePlant = await prisma.uniquePlant.upsert({
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
          id: "clg1tydpd0000mukbypq2ib2s",
        },
      },
    },
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
