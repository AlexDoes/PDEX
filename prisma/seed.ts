import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("tashisamatashisama", 12);
  const user = await prisma.user.upsert({
    where: { email: "DummyUser2@pdex.com" },
    update: {},
    create: {
      email: "DummyUser2@pdex.com",
      name: "Tashi sucks2",
      password,
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
