import AuthForm from '@/components/AuthForm'
import { Cable } from 'lucide-react'

const SignIn = () => {
  return (
    <div className='container mx-auto mt-40 flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <Cable className='mx-auto h-6 w-6' />
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
        <p className='text-sm max-w-xs mx-auto'>
          By continuing, you are setting up a account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <AuthForm />
    </div>
  )
}

export default SignIn