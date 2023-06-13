import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { uniq } from "lodash";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("tashisamatashisama", 12);
  const user = await prisma.user.upsert({
    where: { email: "DummyUser3@pdex.com" },
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
      nickname: "Alex",
      username: "alex",
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
      nickname: "Tashi",
      username: "tashi",
      password: password2,
      id: "3",
      image: "https://pdex.s3.amazonaws.com/tashi.jpeg",
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "marco@pdex.com" },
    update: {},
    create: {
      email: "marco@pdex.com",
      name: "Marco Countryman",
      nickname: "Marco",
      username: "marco",
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
      nickname: "Steven",
      username: "steven",
      password: password2,
      id: "2",
    },
  });

  const user0303 = await prisma.user.upsert({
    where: { email: "kt@pdex.com" },
    update: {},
    create: {
      email: "kt@pdex.com",
      name: "Katie",
      nickname: "Katie",
      username: "katie",
      password: password2,
      id: "0303",
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
      image:
        "https://images.unsplash.com/photo-1589893432683-529de88655a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=664&q=80",
      water: "once a week",
      light: "direct sunlight",
      species: "Aloe Vera",
      normalized_species: "Aloe Vera",
      ownedBy: {
        connect: {
          id: "1",
        },
      },
    },
  });

  const KatiesPlants = await prisma.uniquePlant.upsert({
    where: { id: "BAX" },
    update: {
      description:
        "Meet BAX my stunning Albino Monstera Albo plant 🌿✨ This unique beauty is a true head-turner and always stands out in my plant collection. Loving the contrast of his white variegation against the lush green leaves. 🤍🌿 Who else loves this plant as much as I do?#AlbinoMonstera #PlantLove #RareBeauty #BAX",
      image: "https://pdex.s3.amazonaws.com/BAX.png",
    },
    create: {
      id: "BAX",
      name: "Bax",
      image: "https://pdex.s3.amazonaws.com/BAX.png",
      species: "Monstera Albo",
      normalized_species: "Monstera Albo",
      ownedBy: {
        connect: {
          id: "0303",
        },
      },
      description:
        "Meet BAX my stunning Albino Monstera Albo plant 🌿✨ This unique beauty is a true head-turner and always stands out in my plant collection. Loving the contrast of his white variegation against the lush green leaves. 🤍🌿 Who else loves this plant as much as I do?#AlbinoMonstera #PlantLove #RareBeauty #BAX",
    },
  });

  const KatiesPlantsData = [
    {
      name: "Parker",
      image: "https://pdex.s3.amazonaws.com/PARKER.PNG",
      species: "Scinapsis Mayari",
      normalized_species: "Scinapsis Mayari",
      ownerId: "0303",
      id: "PARKER",
      description:
        "I'm excited to show you Parker, also known as the Mayori Pothos or Marble Pothos. This climbing plant has heart-shaped leaves that are marbled with green and white colors, giving it a unique and striking appearance.  Parker is native to the Solomon Islands and is a popular houseplant because he’s easy to care for and can tolerate low-light conditions. He can grow up to 10 feet long, but I've kept mine at a more manageable size for my home.",
    },
    {
      name: "Pink Princess",
      image: "https://pdex.s3.amazonaws.com/PINKPRINCESS.png",
      species: "Philodendron Erubescens",
      normalized_species: "Philodendron Erubescens",
      ownerId: "0303",
      id: "PINKPRINCESS",
      description:
        "Say hello to my new stunning Philodendron Erubescens, Pink Princess 🌿😍 While she may not have the flashy variegation of some of my other plants, this low-variegation beauty has a charm of its own. Her deep green leaves have a gorgeous glossy finish, and the way they gracefully trail down the pot is a sight to behold. 🌱💚 Can't wait to watch her grow and flourish in my home! #PhilodendronErubescens #PlantLove #GreenBeauty",
    },
    {
      name: "Green Princess",
      image: "https://pdex.s3.amazonaws.com/GREEN.png",
      ownerId: "0303",
      id: "GREENPRINCESS",
      normalized_species: "Anthurium Clarinervium",
      species: "Anthurium Clarinervium",
      description:
        "Introducing my new heartthrob Green Princess, the Anthurium Clarinervium ❤️🌿 This velvety beauty has stolen my heart with its large, heart-shaped leaves and striking white veins. Her unique and exotic appearance is a real show-stopper in my plant collection, and I can't stop admiring its beauty. 😍🌱 Who else is crushing on this gorgeous plant? #AnthuriumClarinervium #PlantLove #ExoticBeauty #BAX",
    },
  ];

  const generateManyPlants = await prisma.$transaction(
    KatiesPlantsData.map((uniquePlant) =>
      prisma.uniquePlant.upsert({
        where: { id: uniquePlant.id },
        update: {
          description: uniquePlant.description,
          image: uniquePlant.image,
        },
        create: {
          id: uniquePlant.id,
          name: uniquePlant.name,
          description: uniquePlant.description,
          image: uniquePlant.image,
          species: uniquePlant.species,
          normalized_species: uniquePlant.normalized_species,
          ownedBy: {
            connect: {
              id: uniquePlant.ownerId,
            },
          },
        },
      })
    )
  );

  const KatiesCollection = await prisma.plantCollection.upsert({
    where: { id: "KatiesCollection" },
    update: {},
    create: {
      id: "KatiesCollection",
      name: "Katie's Collection",
      public: true,
      weight: 999,
      owner: {
        connect: {
          id: "0303",
        },
      },
      plantContents: {
        connect: [
          {
            id: "PARKER",
          },
          {
            id: "PINKPRINCESS",
          },
          {
            id: "GREENPRINCESS",
          },
          {
            id: "BAX",
          },
        ],
      },
    },
  });

  const TashisPlantsData = [
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
  ];

  const generateManyPlants2 = await prisma.$transaction(
    TashisPlantsData.map((uniquePlant) =>
      prisma.uniquePlant.upsert({
        where: { id: uniquePlant.id },
        update: { description: uniquePlant.description },
        create: {
          id: uniquePlant.id,
          name: uniquePlant.name,
          description: uniquePlant.description,
          image: uniquePlant.image,
          species: uniquePlant.species,
          normalized_species: uniquePlant.species,
          ownedBy: {
            connect: {
              id: uniquePlant.ownerId,
            },
          },
        },
      })
    )
  );

  const plantCollection = await prisma.plantCollection.upsert({
    where: { id: id },
    update: { description: "Tashi's Collection" },
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
