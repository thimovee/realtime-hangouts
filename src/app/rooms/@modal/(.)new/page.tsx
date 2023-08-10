import { CreateRoom } from '@/components/CreateRoom'
import { db } from '@/lib/db'
import { Category } from '@prisma/client'
import { Loader2, X } from 'lucide-react'
import React from 'react'

const page = async () => {
    const allCategories = await db.category.findMany() as Category[]
    return (
        <div className='fixed inset-0 bg-zinc-900/70 z-[200] w-[100dvw]'>
            <div className='container flex items-center h-full max-w-lg mx-auto'>
                <div className='flex flex-col bg-card w-full h-fit pt-8 pb-16 px-2 rounded-lg'>
                    <div className='flex justify-between items-center p-3 border-b border-border'>
                        <h2 className="text-2xl font-bold">Create Room</h2>
                        <a className='p-2 rounded-full border border-border hover:bg-accent' href="/rooms"><X aria-label='close modal' className='h-4 w-4' /></a>
                    </div>
                    <div className="p-3">
                        {allCategories.length > 0 ? <CreateRoom categories={allCategories} /> : <div> <Loader2 /></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page