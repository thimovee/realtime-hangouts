'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'



interface FilteringControlsProps {
    categories: Category[]
}

const FilteringControls: FC<FilteringControlsProps> = ({ categories }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const category = searchParams.get('category') ?? 'all'
    const joined = searchParams.get('joined') ?? 'false'
    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '6'

    return (
        <div className='flex gap-6 my-10'>
            <select
                className='foreground hover:cursor-pointer px-3 py-2 rounded-md'
                value={category}
                onChange={(e) => {
                    router.push(`/rooms?page=${page}&per_page=${per_page}&joined=${joined}&category=${e.target.value}`)
                }}
            >
                <option value='all'>All</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <label className='flex items-center gap-2 hover:cursor-pointer'>
                <input
                    type='checkbox'
                    checked={joined === 'true'}
                    onChange={() => {
                        router.push(`/rooms?page=${page}&per_page=${per_page}&joined=${joined === 'true' ? 'false' : 'true'}&category=${category}`)
                    }}
                />
                <span>Only show rooms I&apos;m in</span>
            </label>
        </div>
    )
}

export default FilteringControls