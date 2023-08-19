import { Button } from '@/components/ui/Button'
import { Github, Users } from 'lucide-react'
import Image from 'next/image'
import bigImage from "../../public/images/bigImg.svg"
import smImage from "../../public/images/smallImg.svg"
import Link from 'next/link'
export default function Home() {
  return (
    <div className='pb-20 md:pb-0 px-4 xl:px-0 container max-w-7xl h-full  flex-col mx-auto flex mt-16 items-center'>
      <div className="flex flex-col max-w-2xl mb-10">
        <h1 className='animate-fade-up opacity-0 text-center text-4xl md:text-5xl lg:text-7xl font-bold tracking-[0.1] bg-gradient-to-br from-black to-stone-500 dark:from-white dark:to-stone-300 bg-clip-text  font-display  text-transparent  drop-shadow-sm'
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>Realtime chat solution for coders</h1>
        <p className='sm:text-base lg:text-xl text-center my-10 animate-fade-up opacity-0' style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>Fueling creativity through dynamic real-time coding interactions on Code Connect.</p>
        <div className="animate-slide-down-fade flex gap-8 mx-auto" style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}>
          <Button className='p-0 w-40 rounded-full bg-primary hover:bg-primary/80 text-white'>
            <a href='/rooms' className='flex items-center justify-center w-full'>
              <Users className='w-4 h-4 mr-3' /> Join a room
            </a>
          </Button>
          <Button className='w-48 rounded-full px-0'>
            <Link target='_blank' href='https://github.com/thimovee/realtime-hangouts' className='flex items-center justify-center w-full'>
              <Github className='w-4 h-4 mr-3' /> View on Github
            </Link>
          </Button>
        </div>
      </div>
      <div className='overflow-hidden animate-fade-up opacity-0 pt-4 md:pt-0  rounded-md flex w-full border border-border' style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
        <Image alt="hero image" src={bigImage} className='hidden md:flex rounded-md object-contain w-full' />
        <Image alt="hero image" src={smImage} className='md:hidden rounded-md object-contain w-full' />
      </div>
    </div>
  )
}
