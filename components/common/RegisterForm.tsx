"use client";
import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader2 } from 'lucide-react';

const initialFormData = {
    name: '',
    email: '',
    password: '',
    cpassword: ''
}

interface PropTypes {
    disabled: boolean,
    handleFormSubmit: Function
}

function RegisterForm(props: PropTypes) {
    const {disabled, handleFormSubmit} = props;
    const [formData, setFormData] = useState(initialFormData)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleFormSubmit();
    }
    
  return (
    <form className='mt-3 flex flex-col gap-2' onSubmit={handleSubmit}>
        <label className='flex flex-col gap-1'>
            Full Name
            <Input name='name' onChange={handleChange} value={formData.name} type="text" placeholder="Please enter your full name..." />
        </label>
        <label className='flex flex-col gap-1'>
            Email
            <Input name='email' onChange={handleChange} value={formData.email} type="email" placeholder="Please enter your email..." />
        </label>
        <label className='flex flex-col gap-1'>
            Password
            <Input name='password' onChange={handleChange} value={formData.password} type="password" placeholder="Please enter your password..." />
        </label>
        <label className='flex flex-col gap-1'>
            Confirm Password
            <Input name='cpassword' onChange={handleChange} value={formData.cpassword} type="password" placeholder="Please enter your confirm password..." />
        </label>
        <Button type='submit' disabled={disabled} className='bg-blue-600 hover:bg-blue-500 mt-2'>Register {disabled ? <Loader2 className='ml-1 h-4 w-4 animate-spin' /> : ''}</Button>
        <Link href={"/login"} className='self-center'>Already have an account? <b>Login</b></Link>
    </form>
  )
}

RegisterForm.defaultProps = {
    disabled: false,
    handleFormSubmit: () => {}
}

export default RegisterForm