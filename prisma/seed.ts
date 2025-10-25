// const { PrismaClient } = require('@prisma/client')
// When using a custom generator output (see prisma/schema.prisma -> output = "../lib/generated/prisma"),
// import the client from the generated folder instead of from '@prisma/client'.
// Importing from '@prisma/client' will hit a placeholder that throws if the client wasn't
// initialized/copied into node_modules/.prisma/client.
// Import the generated client bundle directly (explicit file import so ESM resolver can find it)
import { PrismaClient } from '../lib/generated/prisma/index.js'
const prisma = new PrismaClient();

async function main(){
    const demoUserId = "7dc0ca18-5ede-4f00-935a-f0ba5523016d"

        await prisma.products.createMany({
                data: Array.from({ length: 25 }).map((_, i) => ({
            userId: demoUserId,
            name: `Product ${i + 1}`,
            // Prisma Decimal fields accept string or Decimal; seed with string for simplicity
            price: (Math.random() * 90 + 10).toFixed(2),
            quantity: Math.floor(Math.random() * 20),
            lowStockAt: 5,
            createAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
        })),
        })

    console.log(`Seed data created for successfully`)
    console.log(`created 25 products for userId ${demoUserId}`)

}



main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })