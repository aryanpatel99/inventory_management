import React from 'react'
import Container from '../components/Container'
import { SignIn, StackTheme } from '@stackframe/stack'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
//   const theme = {
//   color: {
//     text:"#000",

//   },
//   light: {
//     primary: 'red',
//   },
//   dark: {
//     primary: '#00FF00',
//   },
//   radius: '8px',

// }


  return (
    <Container>
        <div className='flex flex-col gap-5 justify-center items-center h-full'>
        <SignIn />
        <Link href={"/"}>
          <Button size={"sm"}>Go Back</Button>
        </Link>
        </div>

    </Container>
  )
}

export default page