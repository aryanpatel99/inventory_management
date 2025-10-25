import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Container from './components/Container'

const page = () => {
  return (
    // <div className="min-h-screen w-full relative bg-black">
    //   {/* Copper Forge Background with Top Glow */}
    //   <div
    //     className="absolute inset-0 z-0"
    //     style={{
    //       background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000",
    //     }}
    //   >
    //     {/* content */}
    //     <div className='flex flex-col gap-5 justify-center items-center h-full'>
    //       <div className='text-3xl text-white font-bold'>Inventory Management</div>
    //       <div className='flex gap-5'>
    //        <Link href='/sign-in'>
    //        <Button className='cursor-pointer' variant='default'>Sign-up</Button>
    //        </Link>
    //        <Button>Learn More</Button>
           
    //       </div>
    //     </div>

    //   </div>
    // </div>

    <Container>
      <div className='flex flex-col gap-5 justify-center items-center h-full'>
          <div className='text-3xl text-white font-bold'>Inventory Management</div>
         <div className='flex gap-5'>
         <Link href='/sign-in'>
         <Button className='cursor-pointer' variant='default'>Sign-up</Button>
        </Link>
        <Button>Learn More</Button>

        <Link href='/dashboard'>
         <Button className='cursor-pointer' variant='default'>Dashboard</Button>
        </Link>

           
        </div>
       </div>
    </Container>
  )
}

export default page