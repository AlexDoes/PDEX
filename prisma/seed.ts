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
    where: { email: "Tash@pdex.com" },
    update: {},
    create: {
      email: "Tashi@pdex.com",
      name: "Tashi Sangpo",
      password: password2,
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
