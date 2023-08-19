import React from 'react'

const loading = () => {
    return (
        <section className='pb-32 px-4 xl:px-0 container max-w-7xl h-full mx-auto flex flex-col'>
            <div className="flex flex-col md:flex-row justify-between pb-10 border-b-2 border-accent">
                <div className="w-full md:w-1/2">
                    <div className="w-32 h-10 rounded-full bg-accent animate-pulse" />
                    <div className='h-6 mt-4 rounded-full bg-accent animate-pulse w-full' />
                </div>
                <div className="w-full mt-[90px] md:w-1/2 flex justify-end items-end">
                    <div className="h-9 w-[135px] mr-2 bg-accent animate-pulse rounded-md" />
                </div>
            </div>
            <div className="my-10 h-9 w-96 bg-accent animate-pulse rounded-md" />
            <div className=' rounded-md bg-accent animate-pulse h-60 w-full' />
        </section>
    )
}

export default loading
