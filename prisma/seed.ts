import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        sku: "SKU-RED-001",
        name: "Switch Gerenciável 24 Portas Gigabit L2+",
        description: "Switch corporativo de alta performance para infraestrutura de rede avançada.",
        priceCents: 145000,
        category: "Redes",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
        warranty: "3 Anos On-site",
        stock: 40, // Quantidade em estoque (não padrão, variável de acordo com o projeto). 
        specInterface: "24x Portas RJ45 GbE + 4x SFP+",
        specPower: "Bivolt Automático",
        specSpeed: "104 Gbps",
        specType: "Gerenciável L2+",
      },
      {
        sku: "SKU-CAB-002",
        name: "Bobina de Cabo UTP Cat6 Caixa 305m",
        description: "Cabo de rede 100% cobre homologado para instalações estruturadas.",
        priceCents: 78050,
        category: "Cabeamento",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
        warranty: "1 Ano Fabricante",
        stock: 40, // Quantidade em estoque (não padrão, variável de acordo com o projeto).
        specInterface: "100% Cobre Nu",
        specPower: "N/A",
        specSpeed: "Até 1 Gbps / 250MHz",
        specType: "UTP Caixa 305m",
      },
      {
        sku: "SKU-AUT-003",
        name: "Kit Leitor de Código de Barras Laser 2D USB",
        description: "Leitor ergonômico ideal para frentes de caixa e controle de estoque logístico.",
        priceCents: 32000,
        category: "Automação",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
        warranty: "2 Anos",
        stock: 40, // Quantidade em estoque (não padrão, variável de acordo com o projeto).
        specInterface: "USB / Bluetooth",
        specPower: "Alimentado por Porta",
        specSpeed: "300 leituras/seg",
        specType: "Laser 2D Imager",
      },
      {
        sku: "SKU-ENE-004",
        name: "Nobreak Interativo 1500VA Senoidal",
        description: "Proteção avançada contra quedas de energia para servidores e equipamentos críticos.",
        priceCents: 189000,
        category: "Energia",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600",
        warranty: "2 Anos Balcão",
        stock: 40, // Quantidade em estoque (não padrão, variável de acordo com o projeto).
        specInterface: "6 Tomadas NBR 14136",
        specPower: "1500VA / 1050W",
        specSpeed: "Senoidal Pura",
        specType: "Interativo",
      },
      {
        sku: "SKU-RED-005",
        name: "Access Point Wi-Fi 6 Corporativo Dual-Band",
        description: "Cobertura de alta densidade para escritórios e galpões industriais.",
        priceCents: 92000,
        category: "Redes",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
        warranty: "3 Anos",
        stock: 40, // Quantidade em estoque (não padrão, variável de acordo com o projeto).
        specInterface: "Porta PoE+ 2.5GbE",
        specPower: "PoE+ 802.3at",
        specSpeed: "Até 3000 Mbps",
        specType: "Wi-Fi 6 (802.11ax)",
      },
      {
        sku: "SKU-HW-007",
        name: "Servidor Torre Xeon E-2334 16GB RAM 2TB",
        description: "Servidor corporativo para banco de dados e virtualização empresarial.",
        priceCents: 890000,
        category: "Hardware",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
        warranty: "3 Anos On-site ProSupport",
        stock: 40, // Quantidade em estoque (não padrão, variável de acordo com o projeto).
        specInterface: "Quad-Core Xeon / 16GB",
        specPower: "Fonte Redundante 450W",
        specSpeed: "PCIe 4.0",
        specType: "Servidor Torre",
      },
    ],
  });
}

main().finally(() => prisma.$disconnect());