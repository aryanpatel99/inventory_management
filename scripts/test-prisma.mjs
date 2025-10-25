// ESM-friendly test that imports the generated Prisma client and inspects model accessors.
import clientModule from '../lib/generated/prisma/index.js';

async function main() {
  try {
    const PrismaClient = clientModule.PrismaClient;
    if (!PrismaClient) {
      console.error('PrismaClient not found on generated client module');
      process.exitCode = 2;
      return;
    }

    const prisma = new PrismaClient();

    // List top-level properties on the client to show model names
    const keys = Object.keys(prisma).sort();
    console.log('Prisma client properties (sample):', keys.slice(0, 50));
    console.log('has prisma.products?', typeof prisma.products !== 'undefined');

    await prisma.$disconnect();
  } catch (err) {
    console.error('Error while inspecting prisma client:', err);
    process.exitCode = 2;
  }
}

main();
