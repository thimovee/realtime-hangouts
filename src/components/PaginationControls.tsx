'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationControlsProps {
    hasNextPage: boolean
    hasPrevPage: boolean
}

const PaginationControls: FC<PaginationControlsProps> = (
    {
        hasNextPage,
        hasPrevPage,
    }
) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const search = searchParams.get('search') ?? ''
    const category = searchParams.get('category') ?? 'all'
    const joined = searchParams.get('joined') ?? 'false'
    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '6'

    return (
        <div className='flex gap-2'>
            <button
                className='bg-primary disabled:bg-accent disabled:hover:cursor-not-allowed text-white p-1'
                disabled={!hasPrevPage}
                onClick={() => {
                    router.push(`/rooms?page=${Number(page) - 1}&per_page=${per_page}&joined=${joined}&category=${category}`)
                }}>
                <ChevronLeft className='h-5 w-5' />
                <span className='sr-only'>previous page</span>
            </button>
            <div>
                {page} / {Math.ceil(10 / Number(per_page))}
            </div>
            <button
                className='bg-primary disabled:bg-accent disabled:hover:cursor-not-allowed text-white p-1'
                disabled={!hasNextPage}
                onClick={() => {
                    router.push(`/rooms?page=${Number(page) + 1}&per_page=${per_page}&joined=${joined}&category=${category}`)
                }}>
                <ChevronRight className='h-5 w-5' />
                <span className='sr-only'>next page</span>
            </button>
        </div>
    )
}

export default PaginationControls