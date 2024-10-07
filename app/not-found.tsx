import Image from 'next/image'
import React from 'react'
import ErrorImg from "@/public/Error404.gif"
import Link from 'next/link'

function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-white'>
        <Image 
            src={ErrorImg}
            width={500}
            height={500}
            alt='Error 404'
        />
        <h2 className='text-2xl font-bold'>This is not the web page you are looking for</h2>
        <Link href={"/"} className='underline text-xl '>Return to home</Link>
    </div>
  )
}

export default NotFound