import AuthForm from '@/components/AuthForm'
import CloseModal from '@/components/CloseModal'
import { Cable } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='fixed inset-0 bg-zinc-900/20 z-50'>
            <div className='container flex items-center h-full max-w-lg mx-auto'>
                <div className='relative bg-white w-full h-fit py-20 px-2 rounded-lg'>
                    <div className='absolute top-4 right-4'>
                        <CloseModal />
                    </div>
                    <div className='container mx-auto flex w-11/12 flex-col justify-center space-y-6 sm:w-[400px]'>
                        <div className='flex flex-col space-y-2 text-center'>
                            <Cable className='mx-auto h-6 w-6' />
                            <h1 className='text-2xl font-semibold tracking-tight text-black dark:text-white'>Welcome back</h1>
                            <p className='text-sm max-w-xs mx-auto text-slate-800 dark:text-slate-200'>
                                By continuing, you are setting up a account and agree to our
                                User Agreement and Privacy Policy.
                            </p>
                        </div>
                        <AuthForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
