import React from 'react';
import Link from 'next/link';
import RegisterForm from '@/components/common/RegisterForm';

function page() {
 return (
    <div className='h-screen w-full flex justify-center items-center'>
        <div className='w-[30rem] px-8 py-8 rounded-lg bg-white shadow-lg'>
        <h1 className='text-center text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text'><Link href={"/"}>Clash</Link></h1>
            <h1 className='text-2xl font-bold'>Register</h1>
            <p>Welcome to Clash!</p>
            <RegisterForm />
        </div>
    </div>
  )
}

export default page