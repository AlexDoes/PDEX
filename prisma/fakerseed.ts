import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { de, faker } from "@faker-js/faker";

const prisma = new PrismaClient({
  // datasources: {
  //   db: {
  //     url: process.env.POSTGRES_PRISMA_URL,
  //   },
  // },
});

const descriptions = [
  "Embracing the green vibes with my lush indoor garden. 🌿🌱 #PlantLove",
  "My plant sanctuary, where nature thrives and tranquility blooms. 🌺🌿 #GreenOasis",
  "Nature's artwork adorns my living space, bringing life and beauty to every corner. 🎨🌿 #LivingGallery",
  "A symphony of green hues, each plant telling its own unique story. 🍃🌿 #BotanicalTales",
  "Unleashing the power of nature's healing touch, one leaf at a time. 🌿💚 #PlantTherapy",
  "A mini urban jungle thriving amidst the concrete jungle. 🌴🌿 #UrbanOasis",
  "Bathing in the morning sun, my plants awaken to a world full of possibilities. 🌞🌿 #SunlitBliss",
  "Witnessing the miracle of growth, as tiny seeds evolve into breathtaking living sculptures. 🌱🌿 #NatureUnfolded",
  "Plant parenthood made easy, where love and care nurture the green wonders. 🌿🌱 #GreenThumb",
  "Living in harmony with nature's masterpieces, finding solace in their silent presence. 🌿✨ #NaturalBalance",
  "Jungle vibes, wild and untamed, bringing a touch of wilderness to my cozy home. 🌿🌴 #UrbanSafari",
  "A botanical treasure trove, where every plant holds a secret waiting to be discovered. 🌱🔍 #GreenSecrets",
  "Nature's embrace, creating a haven of serenity and calm amidst the chaos of everyday life. 🌿🕊️ #NatureSanctuary",
  "A living tapestry of colors and textures, transforming my space into a vibrant oasis. 🌺🌿 #LivingArt",
  "Plant magic at its finest, casting a spell of tranquility and enchantment upon my home. 🌿✨ #GreenEnchantment",
  "Nature's symphony, where rustling leaves and gentle breezes compose a melody of peace. 🍃🎶 #HarmonyOfNature",
  "Plant love knows no boundaries, filling every nook and cranny with botanical beauty. 🌿💚 #PlantLifeEverywhere",
  "Green companions, loyal and ever-growing, reminding me to embrace change and nurture life. 🌱🌿 #GreenCompanions",
  "A leafy paradise, where time slows down and the world outside fades away. 🌿⏳ #TimelessEscape",
  "The wonders of nature, captured in miniature worlds of moss and succulents. 🌿🌵 #TinyTerrariums",
  "Tropical vibes, bringing a slice of paradise into my everyday existence. 🌴🌿 #TropicalEscape",
  "A green thumb's delight, witnessing the miracle of life unfold, leaf by leaf. 🌿🌱 #MiracleOfGrowth",
  "Plants as storytellers, whispering tales of resilience, adaptation, and growth. 🌿📚 #NatureNarratives",
  "An evergreen sanctuary, where nature's gifts offer solace and rejuvenation. 🌿✨ #EvergreenRetreat",
  "The oxygen factory, purifying the air and nourishing my soul with every breath. 🌿💨 #HealthyHabitat",
  "Nature's remedy, providing a balm for the mind, body, and spirit in a world that never stops. 🌿💆‍♀️ #NaturalWellness",
  "A botanical mosaic, where diversity thrives, celebrating the beauty of every leaf and petal. 🌸🌿 #InfiniteVariety",
  "The dance of light and shadows, playing hide-and-seek among the leaves, creating a whimsical atmosphere. 🌿🌑 #DancingShadows",
  "A green sanctuary in the heart of the concrete, reminding us of the beauty and importance of nature's touch. 🌿🏢 #NatureAmidstCity",
  "Plant dreams taking root, inspiring growth, and blooming possibilities in every corner of my home. 🌱🌿✨ #DreamsInBloom",
];

const descriptive_words = [
  "Lush",
  "Vibrant",
  "Diverse",
  "Serene",
  "Green",
  "Flourishing",
  "Botanical",
  "Thriving",
  "Verdant",
  "Abundant",
  "Enchanting",
  "Tranquil",
  "Foliage-rich",
  "Eclectic",
  "Exotic",
  "Leafy",
  "Captivating",
  "Ornamental",
  "Sustainable",
  "Whimsical",
];

async function main() {
  console.log("Start seeding ...");
  const password = await hash("StevenAndAlex", 12);
  for (let i = 0; i < 50; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const nickname = `${firstName}`;
    const username = `${firstName.toLowerCase()}`;
    const email = `${firstName.toLowerCase() + lastName.toLowerCase()}@bax.gg`;
    const description = `${faker.person.bio()}`;
    const image = `https://pdex.s3.amazonaws.com/Avatars/DefaultAvatar${Math.floor(
      Math.random() * 26 + 1
    )}.png`;
    const d1 = Math.floor(Math.random() * descriptions.length);
    const d2 = Math.floor(Math.random() * descriptions.length);
    const d3 = Math.floor(Math.random() * descriptions.length);
    const d4 = Math.floor(Math.random() * descriptions.length);
    console.log("Creating user:", username);
    // await prisma.user.create({
    //   data: {
    //     username: `${username}`,
    //     nickname: `${nickname}`,
    //     name: `${firstName} ${faker.person.lastName()}`,
    //     email: `${email}`,
    //     password: password,
    //     image: `${image}`,
    //     description: `${description}`,
    //     role: "USER",
    //     plantCollection: {
    //       createMany: {
    //         data: [
    //           {
    //             name: `${firstName}'s ${
    //               descriptive_words[
    //                 Math.floor(Math.random() * descriptive_words.length)
    //               ]
    //             } Collection`,
    //             description: `${descriptions[d1]}`,
    //           },
    //           {
    //             name: `${firstName}'s ${
    //               descriptive_words[
    //                 Math.floor(Math.random() * descriptive_words.length)
    //               ]
    //             } Extragavanza`,
    //             description: `${descriptions[d2]}`,
    //           },
    //           {
    //             name: `${firstName}'s ${
    //               descriptive_words[
    //                 Math.floor(Math.random() * descriptive_words.length)
    //               ]
    //             } Paradise'`,
    //             description: `${descriptions[d3]}`,
    //           },
    //           {
    //             name: `${firstName}'s ${
    //               descriptive_words[
    //                 Math.floor(Math.random() * descriptive_words.length)
    //               ]
    //             } Lovely's`,
    //             description: `${descriptions[d4]}`,
    //           },
    //         ],
    //       },
    //     },
    //   },
    // });
    await prisma.user.upsert({
      where: { username: `${username}` },
      update: {},
      create: {
        username: `${username}`,
        nickname: `${nickname}`,
        name: `${firstName} ${faker.person.lastName()}`,
        email: `${email}`,
        password: password,
        image: `${image}`,
        description: `${description}`,
        role: "USER",
        plantCollection: {
          createMany: {
            data: [
              {
                name: `${firstName}'s ${
                  descriptive_words[
                    Math.floor(Math.random() * descriptive_words.length)
                  ]
                } Collection`,
                description: `${descriptions[d1]}`,
              },
              {
                name: `${firstName}'s ${
                  descriptive_words[
                    Math.floor(Math.random() * descriptive_words.length)
                  ]
                } Extragavanza`,
                description: `${descriptions[d2]}`,
              },
              {
                name: `${firstName}'s ${
                  descriptive_words[
                    Math.floor(Math.random() * descriptive_words.length)
                  ]
                } Paradise'`,
                description: `${descriptions[d3]}`,
              },
              {
                name: `${firstName}'s ${
                  descriptive_words[
                    Math.floor(Math.random() * descriptive_words.length)
                  ]
                } Lovely's`,
                description: `${descriptions[d4]}`,
              },
            ],
          },
        },
      },
    });

    console.log(`Created user with username: ${username}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
