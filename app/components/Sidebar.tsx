import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@stackframe/stack'
import { BarChart3, Package, Plus, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Sidebar = ({ currentPath = "/dashboard" }: { currentPath: string }) => {


  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Add Product', href: '/add-product', icon: Plus },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className='fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10'>
      <div className='mb-8'>
        <div className='flex items-center space-x-2 mb-4'>
          <BarChart3 className='w-7 h-7' />
          <span className='text-sm font-semibold'>Inventory Management</span>
        </div>
      </div>


      <nav className='space-y-1'>
        <div className='font-semibold text-gray-400 uppercase'>Inventory</div>
        {navigation.map((item, key) => {
          const isActive = currentPath === item.href;
          return (<Link key={key} href={item.href} className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 ${isActive ? 'bg-gray-800' : ''}`}>
            <item.icon className='w-5 h-5 mr-3' />
            {item.name}
          </Link>
          )
        })}
      </nav>

      <div className='absolute left-0 bottom-0 right-0 p-6 border-t border-gray-700'>
          <div className='flex items-center justify-between'>
            <UserButton showUserInfo/>
          </div>
      </div>

    </div>


  )

}

export default Sidebar