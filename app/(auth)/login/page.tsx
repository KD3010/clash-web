'use client'
import React, { useState, type ChangeEvent, type ChangeEventHandler } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const initialFormData = {
    email: '',
    password: '',
}

function page() {
  const [formData, setFromData] = useState(initialFormData)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFromData({...formData, [event.target.name]: event.target.value})
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <div className='w-[30rem] px-8 py-8 rounded-lg bg-white shadow-lg'>
        <h1 className='text-center text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text'><Link href={"/"}>Clash</Link></h1>
            <h1 className='text-2xl font-bold'>Login</h1>
            <p>Welcome back!</p>
            <form className='mt-3 flex flex-col gap-2'>
                <label className='flex flex-col gap-1'>
                    Email
                    <Input name='email' onChange={handleChange} value={formData.email} type="email" placeholder="Please enter your email..." />
                </label>
                <label className='flex flex-col gap-1'>
                    Password
                    <Input name='password' onChange={handleChange} value={formData.password} type="password" placeholder="Please enter your password..." />
                </label>
                <Link href={"forgot-password"} className='self-end'>Forgot Password?</Link>
                <Button type='submit' className='bg-blue-600 hover:bg-blue-500 mt-2'>Login</Button>
                <Link href={"/register"} className='self-center'>Don't have an account? <b>Register</b></Link>
            </form>
        </div>
    </div>
  )
}

export default page