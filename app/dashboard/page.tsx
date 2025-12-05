import React from 'react'
import Sidebar from '../components/Sidebar'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { TrendingUp } from 'lucide-react'
import ProductChart from '../components/ProductChart'

import { Prisma } from "@/lib/generated/prisma";

type Product = Prisma.ProductsGetPayload<{
  select: { 
    name: true;
    quantity: true;
    lowStockAt: true;
    price?: true;
    sku?: true;
    createAt?: true;
  };
}>;


type ProductSummary = Prisma.ProductsGetPayload<{
  select: { price: true; quantity: true; createAt: true };
}>;




const page = async () => {
  // Use the generated model name. In your Prisma schema the model is named `Products`,
  // which the client exposes as `prisma.products` (lowercased).
  const user = await getCurrentUser();
  const userId = user.id;

  const [totalProducts, lowStock, allProducts]: [number, number, ProductSummary[]] = await Promise.all([
    prisma.products.count({
      where: { userId: userId }
    }),
    prisma.products.count({
      where: {
        userId: userId,
        lowStockAt: { not: null },
        quantity: { lte: 5 },

      },


    }),
    prisma.products.findMany({
      where: { userId: userId },
      select: { price: true, quantity: true, createAt: true }
    }),


  ])



  const recent = await prisma.products.findMany({
    where: { userId: userId },
    orderBy: { createAt: 'desc' },
    take: 5
  });

  const now = new Date();
  // console.log(now)
  const weeklyProductsData = []

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekStart.setHours(23, 59, 59, 999);


    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, '0')}/${String(weekStart.getDate() + 1).padStart(2, '0')}`;

    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length
    })
  }

  // const allProducts = await prisma.products.findMany({
  //   where:{userId:userId},
  //   select:{price:true, quantity:true,createAt:true}
  // }) 

  const totalValue = allProducts.reduce((acc: number, product) => {
    return acc + (Number(product.price) * Number(product.quantity));
  }, 0);


  const inStockCount = allProducts.filter(product => Number(product.quantity) > 5).length
  const lowStockCount = allProducts.filter(product => Number(product.quantity) < 5 && Number(product.quantity) >= 1).length
  const outOfStockCount = allProducts.filter(product => Number(product.quantity) === 0).length

  const inStockPercentage = totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0
  const lowStockPercentage = totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0
  const outOfStockPercentage = totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0


  return (
    <div className='min-h-screen bg-gray-50'>
      <Sidebar currentPath='/dashboard' />
      <main className='ml-64 p-8'>
        {/* header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
              <p className='text-sm text-gray-500'>Here is an overview of your inventory.</p>
            </div>
          </div>
        </div>




        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* key metric content */}
          <div className='bg-white rounded-lg border border-gray-200 p-6'>
            <h2 className='text-lg font-semibold text-gray-900 mb-6'>Key Metrics</h2>
            <div className='grid grid-cols-3 gap-6'>
              <div className='text-center'>
                <div className='text-3xl text-bold text-gray-900'>{totalProducts}</div>
                <div className='text-sm text-gray-600'>Total Products</div>
                <div className='flex items-center justify-center mt-1'><span className='text-xs text-green-600'>+{totalProducts}</span>
                  <TrendingUp className='w-3 h-3 text-green-600 ml-1' />
                </div>
              </div>

              <div className='text-center'>
                <div className='text-3xl text-bold text-gray-900'>${Number(totalValue).toFixed(0)}</div>
                <div className='text-sm text-gray-600'>Total Value</div>
                <div className='flex items-center justify-center mt-1'><span className='text-xs text-green-600'>+${Number(totalValue).toFixed(0)}</span>
                  <TrendingUp className='w-3 h-3 text-green-600 ml-1' />
                </div>
              </div>

              <div className='text-center'>
                <div className='text-3xl text-bold text-gray-900'>{lowStock}</div>
                <div className='text-sm text-gray-600'>Low Stock</div>
                <div className='flex items-center justify-center mt-1'><span className='text-xs text-green-600'>+{lowStock}</span>
                  <TrendingUp className='w-3 h-3 text-green-600 ml-1' />
                </div>
              </div>
            </div>
          </div>

          {/* inventory overtime */}
          <div className='bg-white rounded-lg border border-gray-200 p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-6'>New Products per week</h2>
            </div>
            <div className='h-48'>
              <ProductChart data={weeklyProductsData} />

            </div>
          </div>


        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* stock levels */}
          <div className='bg-white rounded-lg border border-gray-200 p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-6'>Stock Levels</h2>
            </div>
            <div className='space-y-3'>
              {recent.map((product: Product, i: number) => {
                const stockLevel = product.quantity === 0 ? '0' : product.quantity <= (product.lowStockAt || 5) ? 1 : 2;
                const bgColors = [
                  "bg-red-600",
                  "bg-yellow-600",
                  "bg-green-600"
                ];

                const textColors = [
                  'text-red-600',
                  'text-yellow-600',
                  'text-green-600'
                ];

                return (
                  <div key={i} className='flex items-center justify-between bg-gray-100 p-2 rounded'>
                    <div className='flex items-center justify-center space-x-2'>
                      <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`} />
                      <span className='text-sm font-medium text-gray-900'>{product.name}</span>
                    </div>
                    <div className={` text-sm font-medium ml-auto ${textColors[stockLevel]}`}>{product.quantity} units</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* efficiency chart */}
          <div className='bg-white rounded-lg border border-gray-200 p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='font-semibold text-lg text-gray-900 mb-6'>Efficiency</h2>
            </div>
            <div className='flex items-center justify-center'>
              <div className='relative w-48 h-48'>
                <div className='absolute inset-0 rounded-full border-8 border-gray-200'></div>
                <div style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0% , 100% 100%, 0% 100% , 0% 50%)" }} className='absolute inset-0 rounded-full border-8 border-purple-600'>
                </div>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-gray-900'>{inStockPercentage}</div>
                    <div className='text-sm text-gray-600'>In Stock</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 space-y-2'>
              <div className='flex justify-between items-center text-sm text-gray-600'>
                <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-purple-200 rounded-full' />
                  <span>In Stock ({inStockPercentage}%)</span>
                </div>
              </div>

              <div className='flex justify-between items-center text-sm text-gray-600'>
                <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-purple-600 rounded-full' />
                  <span>Low Stock ({lowStockPercentage}%)</span>
                </div>
              </div>

              <div className='flex justify-between items-center text-sm text-gray-600'>
                <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-gray-200 rounded-full' />
                  <span>Out of Stock ({outOfStockPercentage}%)</span>
                </div>
              </div>


            </div>

          </div>
        </div>

      </main>
    </div>
  )
}

export default page