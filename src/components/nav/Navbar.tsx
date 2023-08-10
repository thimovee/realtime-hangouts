import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { buttonVariants } from '../ui/Button'
import { UserAccountNav } from './UserAccountNav'
import { ToggleTheme } from '../ToggleTheme'
import NavItems from './NavItems'
import { Cable } from 'lucide-react'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <header className='bg-background border-b border-slate-200 dark:border-neutral-800 shadow-sm sticky top-0 inset-x-0 h-fit  z-20 py-4'>
      <div className='px-4 xl:px-0 container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <div className='flex gap-8 items-center'>
          <Link href='/' className='flex gap-2 items-center hover:underline underline-offset-4'>
            <Cable className='h-8 w-8 sm:h-6 sm:w-6' />
            <p className='hidden text-black dark:text-white md:block font-semibold'>Code Connect</p>
          </Link>
          <NavItems />
        </div>
        <div className="flex gap-6">
          <ToggleTheme />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href='/sign-in' className={buttonVariants({
              className: 'w-fit',
            })}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar