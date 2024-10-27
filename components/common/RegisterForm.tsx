"use client";
import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader2 } from 'lucide-react';
import { registerUser } from '@/context/AuthProvider';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import ErrorText from './ErrorText';

const initialFormData = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
}

interface IFormDataType {
    name: string,
    email: string,
    password: string,
    confirm_password: string
}

function RegisterForm() {
    const [formData, setFormData] = useState<IFormDataType>(initialFormData)
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<IFormDataType | null>(null);
    const router = useRouter();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();

        await registerUser(formData, (response: any) => {
            response?.data?.type === 'failed' ? toast.error(response?.data?.message) : toast.success(response?.data?.message);
            setLoading(false);

            if(response?.status === 200) {
                setFormData(initialFormData);
                router.push('/login')
            } else if(response?.status === 422) {
                setErrors(response?.data?.error)
            }
        })
    }
    
  return (
    <form className='mt-3 flex flex-col gap-2' onSubmit={handleSubmit}>
        <label className='flex flex-col gap-1'>
            Full Name
            <Input disabled={loading} name='name' onChange={handleChange} value={formData.name} type="text" placeholder="Please enter your full name..." />
            {errors?.name && <ErrorText text={errors?.name} />}
        </label>
        <label className='flex flex-col gap-1'>
            Email
            <Input disabled={loading} name='email' onChange={handleChange} value={formData.email} type="email" placeholder="Please enter your email..." />
            {errors?.email && <ErrorText text={errors?.email} />}
        </label>
        <label className='flex flex-col gap-1'>
            Password
            <Input disabled={loading} name='password' onChange={handleChange} value={formData.password} type="password" placeholder="Please enter your password..." />
            {errors?.password && <ErrorText text={errors?.password} />}
        </label>
        <label className='flex flex-col gap-1'>
            Confirm Password
            <Input disabled={loading} name='confirm_password' onChange={handleChange} value={formData.confirm_password} type="password" placeholder="Please enter your confirm password..." />
            {errors?.confirm_password && <ErrorText text={errors?.confirm_password} />}
        </label>
        <Button type='submit' disabled={loading} className='bg-blue-600 hover:bg-blue-500 mt-2'>Register {loading ? <Loader2 className='ml-1 h-4 w-4 animate-spin' /> : ''}</Button>
        <Link href={"/login"} className='self-center'>Already have an account? <b>Login</b></Link>
    </form>
  )
}

export default RegisterForm;