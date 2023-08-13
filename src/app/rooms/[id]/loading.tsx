import React from 'react'

const loading = () => {
    return (
        <>
            <div className="bg-accent animate-pulse w-full py-4 -mt-[70px] px-4 xl:px-0">
                <div className="max-w-7xl mx-auto flex justify-between items-center" />
            </div>
            <div className="flex max-w-7xl mx-auto p-4 mt-12">
                <div className="bg-accent animate-pulse px-4 py-2 scroll-smooth border border-border rounded-md flex flex-col w-full h-[65vh] mt-8 z-0">
                    <div className="overflow-y-auto" />
                </div>
            </div>
            <div className="flex max-w-7xl mx-auto p-4 items-end">
                <div className='h-10 bg-accent animate-pulse rounded-md w-full' />
            </div>
        </>
    )
}

export default loading