import { PrismaClient } from "../generated/prisma";

const db = new PrismaClient();

async function main() {
  const existing = await db.demoUser.findMany();
  if (existing.length > 0) {
    console.log("✅ Demo users already exist");
    return;
  }

  await db.demoUser.create({
    data: {
      id: "demo-user-azad",
      name: "أزاد حيدر",
      englishName: "Azad Haider",
      email: "azad@provider.sa",
      role: "PROVIDER",
      roleLabel: "مقدم خدمة",
      initials: "أ ح",
      organization: "ستوديو حيدر للتقنية",
    },
  });

  await db.demoUser.create({
    data: {
      id: "demo-user-loqman",
      name: "لقمان عمّار",
      englishName: "Loqman Ammar",
      email: "loqman@payer.sa",
      role: "PAYER_REVIEWER",
      roleLabel: "ممول ومراجع",
      initials: "ع ع",
      organization: "شركة أمار للاستثمار",
    },
  });

  console.log("✅ Demo users created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
