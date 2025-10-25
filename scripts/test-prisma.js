// Quick, non-destructive check to see what models the Prisma client exposes.
// This avoids running any DB queries (we only inspect the client object).

const prisma = require('../lib/prisma').default || require('../lib/prisma');

(async () => {
  try {
    // List top-level properties on the client to show model names
    const keys = Object.keys(prisma).sort();
    console.log('Prisma client properties (sample):', keys.slice(0, 50));

    // Check specifically for the 'products' accessor
    console.log('has prisma.products?', typeof prisma.products !== 'undefined');
  } catch (err) {
    console.error('Error while inspecting prisma client:', err);
    process.exitCode = 2;
  } finally {
    // Try to disconnect to be safe if a connection was opened
    if (prisma && typeof prisma.$disconnect === 'function') {
      try { await prisma.$disconnect(); } catch (_) {}
    }
  }
})();
