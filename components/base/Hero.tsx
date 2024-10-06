import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function Hero() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div>
            <Image 
                src="./landingPage.svg"
                width={600}
                height={600}
                alt='banner_img'
            />
        </div>
        <div className='text-center'>
            <h1 className='text:6xl md:text-7xl lf:text-9xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text'>Clash</h1>
            <p className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4'>Discover the better choice, together</p>
            <Link href="/login"><Button>Start Free</Button></Link>
        </div>
    </div>
  )
}

export default Hero