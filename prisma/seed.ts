import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      { sku: "SKU-RED-001", name: "Roteador Enterprise", category: "Redes", priceCents: 129900, stock: 40 },
      { sku: "SKU-CAB-002", name: "Cabo Cat6 305m", category: "Cabos", priceCents: 89900, stock: 120 },
      { sku: "SKU-SWT-003", name: "Switch 24 portas", category: "Redes", priceCents: 249900, stock: 15 },
    ],
  });
}

main().finally(() => prisma.$disconnect());