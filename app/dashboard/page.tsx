import React from 'react'
import Sidebar from '../components/Sidebar'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { TrendingUp } from 'lucide-react'


const page = async() => {
  // Use the generated model name. In your Prisma schema the model is named `Products`,
  // which the client exposes as `prisma.products` (lowercased).
  const user = await getCurrentUser();
  const userId = user.id;

  const [totalProducts,lowStock,allProducts] = await Promise.all([
      prisma.products.count({
    where: {userId: userId}
  }),
  prisma.products.count({
    where:{userId:userId,
      lowStockAt:{not:null},
      quantity:{lte:5},

    },


  }),
  prisma.products.findMany({
    where:{userId:userId},
    select:{price:true, quantity:true,createAt:true}
  }) ,


  ])


  // const totalProducts = await prisma.products.count({
  //   where: {userId: userId}
  // });

  // const lowStock = await prisma.products.count({
  //   where:{userId:userId,
  //     lowStockAt:{not:null},
  //     quantity:{lte:5},

  //   },


  // })

  const recent = await prisma.products.findMany({
    where:{userId:userId},
    orderBy:{createAt:'desc'},
    take:5
  });

  // const allProducts = await prisma.products.findMany({
  //   where:{userId:userId},
  //   select:{price:true, quantity:true,createAt:true}
  // }) 

  const totalValue = allProducts.reduce((acc, product) => {
    return acc + (Number(product.price) * Number(product.quantity));
  }, 0);

  

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
                <TrendingUp className='w-3 h-3 text-green-600 ml-1'/>
                </div>
              </div>

              <div className='text-center'>
                <div className='text-3xl text-bold text-gray-900'>${Number(totalValue).toFixed(0)}</div>
                <div className='text-sm text-gray-600'>Total Value</div>
                <div className='flex items-center justify-center mt-1'><span className='text-xs text-green-600'>+${Number(totalValue).toFixed(0)}</span>
                <TrendingUp className='w-3 h-3 text-green-600 ml-1'/>
                </div>
              </div>

              <div className='text-center'>
                <div className='text-3xl text-bold text-gray-900'>{lowStock}</div>
                <div className='text-sm text-gray-600'>Low Stock</div>
                <div className='flex items-center justify-center mt-1'><span className='text-xs text-green-600'>+{lowStock}</span>
                <TrendingUp className='w-3 h-3 text-green-600 ml-1'/>
                </div>
              </div>
            </div>
          </div>

          {/* inventory overtime */}
          

        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* stock levels */}
          <div className='bg-white rounded-lg border border-gray-200 p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-lg font-semibold text-gray-900 mb-6'>Stock Levels</h2>
            </div>
            <div className='space-y-3'>
              {recent.map((product,i)=>{
                const stockLevel = product.quantity === 0 ? '0' :product.quantity <= (product.lowStockAt || 5) ? 1:2 ;
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

                return(
                <div key={i} className='flex items-center justify-between bg-gray-100 p-2 rounded'>
                  <div className='flex items-center justify-center space-x-2'>
                    <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}/>
                    <span className='text-sm font-medium text-gray-900'>{product.name}</span>
                  </div>
                  <div className={` text-sm font-medium ml-auto ${textColors[stockLevel]}`}>{product.quantity} units</div>
                </div>
              )})}
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default page