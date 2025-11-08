import { getCurrentUser } from "@/lib/auth"
import Sidebar from "../components/Sidebar"
import Link from "next/link"
import { createProduct } from "@/lib/actions/products"

export default async function AddProductPage() {
    const user = await getCurrentUser()
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/add-product" />
            <main className="ml-64 p-8">

                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className=" ">
                            <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
                            <p className="text-sm font-light text-gray-500">Add products to your inventory</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <form  className="space-y-6" action={createProduct}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                                <input type="text" id="name" name="name" placeholder="Enter Product Here" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                                    <input type="number" id="price" name="price" step={0.01} min={0} placeholder="0.0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" />
                                </div>

                                <div>
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                                    <input type="number" id="quantity" name="quantity" min={0} placeholder="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                                <input type="text" id="sku" name="sku" placeholder="Enter SKU" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" />
                            </div>


                            <div>
                                <label htmlFor="lowStockAt" className="block text-sm font-medium text-gray-700 mb-2">Low Stock Threshold *</label>
                                <input type="number" id="lowStockAt" name="lowStockAt" min={0} placeholder="Enter low stock threshold" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" />
                            </div>


                            <div className="flex gap-5">
                                <button className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Add Product</button>
                                <Link href={'/inventory'} className="px-6 py-3 rounded-lg bg-gray-300 text-gray-800 hover:text-white hover:bg-gray-700">Cancel</Link>
                            </div>



                        </form>
                    </div>
                </div>

            </main>
        </div>
    )
}