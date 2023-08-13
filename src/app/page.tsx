import { Button } from '@/components/ui/Button'
import { Github, Users } from 'lucide-react'
import Image from 'next/image'
import image from "../../public/images/heroImg.png"
export default function Home() {
  return (
    <div className='px-4 xl:px-0 container max-w-7xl h-full  flex-col mx-auto flex mt-16 items-center'>
      <div className="flex flex-col max-w-2xl mb-10">
        <h1 className='animate-fade-up opacity-0 text-center text-7xl font-bold tracking-[0.1] bg-gradient-to-br from-black to-stone-500 dark:from-white dark:to-stone-300 bg-clip-text  font-display  text-transparent  drop-shadow-sm'
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>Realtime chat solution for coders</h1>
        <p className='text-xl text-center my-10 animate-fade-up opacity-0' style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>Fueling creativity through dynamic real-time coding interactions on Code Connect.</p>
        <div className="animate-slide-down-fade flex gap-8 mx-auto" style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}>
          <Button className='w-40 rounded-full bg-primary hover:bg-primary/80 text-white'> <Users className='w-4 h-4 mr-3' /> Join a room</Button>
          <Button className='w-48 rounded-full'> <Github className='w-4 h-4 mr-3' /> View on Github</Button>
        </div>
      </div>
      <div className='animate-fade-up opacity-0  rounded-md flex w-full border border-border' style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
        <Image alt="hero image" src={image} className='rounded-md object-contain w-full' />
      </div>
    </div>
  )
}
