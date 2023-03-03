import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// prisma.user

async function main() {
  // const newUser = await prisma.user.create({
  //     data: {
  //         name: 'TashiSama',
  //         email: 'TashiSama@pdex.org',
  //         collections: ['rare' , 'common'],
  //         plants : ['pweeb' , 'tweeb'],
  //     },
  // })
  // console.log(newUser)
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
