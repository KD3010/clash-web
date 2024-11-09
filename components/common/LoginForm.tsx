"use client";
import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader2 } from 'lucide-react';
import { loginUser } from '@/context/AuthProvider';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import ErrorText from './ErrorText';
import { signIn } from 'next-auth/react';

const initialFormData = {
    email: '',
    password: ''
}

interface IFormDataType {
    email: string,
    password: string
}

const LoginForm = () => {
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

        await loginUser(formData, (response: any) => {
            response?.data?.type === 'failed' ? toast.error(response?.data?.message) : toast.success(response?.data?.message);
            setLoading(false);

            if(response?.status === 201) {
                signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: true,
                    callbackUrl: "/dashboard"
                })
            } else if(response?.status === 422) {
                setErrors(response?.data?.error)
            }
        })
    }
    
  return (
    <form className='mt-3 flex flex-col gap-2' onSubmit={handleSubmit}>
        <label className='flex flex-col gap-1'>
            Email
            <Input name='email' onChange={handleChange} value={formData.email} type="email" placeholder="Please enter your email..." />
            {errors?.email && <ErrorText text={errors.email}/>}
        </label>
        <label className='flex flex-col gap-1'>
            Password
            <Input name='password' onChange={handleChange} value={formData.password} type="password" placeholder="Please enter your password..." />
            {errors?.password && <ErrorText text={errors.password}/>}
        </label>
        <Link href={"forgot-password"} className='self-end'>Forgot Password?</Link>
        <Button disabled={loading} type='submit' className='bg-blue-600 hover:bg-blue-500 mt-2'>Login {loading ? <Loader2 className='ml-1 h-4 w-4 animate-spin' /> : ''}</Button>
        <Link href={"/register"} className='self-center'>Don't have an account? <b>Register</b></Link>
    </form>
  )
}

export default LoginForm;
 