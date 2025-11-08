import { prisma } from "@/lib/prisma";
import Sidebar from "../components/Sidebar";
import { getCurrentUser } from "@/lib/auth";
import { deleteProduct } from "@/lib/actions/products";
import Pagination from "../components/Pagination";

export default async function InventoryPage({searchParams}:{searchParams:Promise<{q?:string,page:string}>}) {

    const user = await getCurrentUser();
    const userId = user.id

    const params = await searchParams 
    const q = (params.q ?? "").trim()

    const where = {userId,
        ... (q?{name:{contains:q, mode:"insensitive" as const}} : {})
    }

    const pageSize = 5

    
    const page =Math.max(1, Number(params.page ?? 1))
    // const totalProducts = await prisma.products.findMany({where})
    
    const [totalCounts,items] = await Promise.all([
        prisma.products.count(),
        await prisma.products.findMany({where,
            orderBy:{createAt:"desc"},
            skip:(page-1)*pageSize,
            take:pageSize
        })
    ])
    
    const totalPages = Math.max(1,Math.ceil(totalCounts/ pageSize))

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/inventory"/>
            <main className="ml-64 p-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className=" ">
                            <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
                            <p className="text-sm font-light text-gray-500">Manage your products and manage your inventory</p>
                        </div>
                    </div>
                </div>

            {/* for the search */}
            <div className="space-y-6">

                <div className="bg-white rounded-lg boder boder-gray-200 p-6">
                    <form className="flex gap-2" action="/inventory" method="GET" >
                        <input className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" type="text" name="q" placeholder="Search Products.." />
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Search</button>
                    </form>
                </div>


                {/* products */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Low Stock At</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((product,i)=>(
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="px-3 py-4 text-left text-sm  text-gray-500 ">{product.name}</td>
                                    <td className="px-3 py-4 text-left text-sm  text-gray-500 ">{product.sku || "-"}</td>
                                    <td className="px-3 py-4 text-left text-sm  text-gray-800 ">$ {Number(product.price).toFixed(2)}</td>
                                    <td className="px-3 py-4 text-left text-sm  text-gray-800 ">{product.quantity}</td>
                                    <td className="px-3 py-4 text-left text-sm  text-gray-500 ">{product.lowStockAt || "-"}</td>
                                    <td className="px-3 py-4 text-left text-sm  text-gray-500 ">
                                        <form action={async(formData:FormData)=>{
                                                "use server"
                                                await deleteProduct(formData)
                                        }}>
                                            <input type="hidden" name="id" value={product.id} />
                                            <button className="text-red-600 hover:text-red-900">Delete</button>
                                        </form></td>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>

                {totalPages > 1 && <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <Pagination currentPage={page} totalPages={totalPages} baseUrl="/inventory" searchParams={{
                        q,
                        paperSize:String(pageSize)
                    }}/>
                </div>}
            </div>

            </main>
        </div>
    )
}