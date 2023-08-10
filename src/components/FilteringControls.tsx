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
    const search = searchParams.get('search') ?? ''
    const category = searchParams.get('category') ?? 'all'
    const joined = searchParams.get('joined') ?? 'false'
    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '5'

    return (
        <div className='flex gap-2'>
            <label className='flex items-center gap-1'>
                <input
                    type='checkbox'
                    checked={joined === 'true'}
                    onChange={() => {
                        router.push(`/rooms?page=${page}&per_page=${per_page}&joined=${joined === 'true' ? 'false' : 'true'}&category=${category}`)
                    }}
                />
                <span>Only show rooms I&apos;m in</span>
            </label>
            <select
                className='bg-primary text-white p-1'
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
        </div>
    )
}

export default FilteringControls