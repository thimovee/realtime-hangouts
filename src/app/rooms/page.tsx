import { Button } from '@/components/ui/Button'
import { db } from '@/lib/db'
import React from 'react'
import { Plus } from 'lucide-react'
import RoomCard from '@/components/ui/RoomCard'
import { ExtentedRoom } from '@/types/room'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Category } from '@prisma/client'
import { CreateRoom } from '@/components/CreateRoom'
import Link from 'next/link'
import PaginationControls from '@/components/PaginationControls'
import FilteringControls from '@/components/FilteringControls'

export const revalidate = 0

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const allRooms = await db.room.findMany({
    include: {
      category: true,
      messages: true,
      users: true,
    }
  }) as ExtentedRoom[]
  const session = await getServerSession(authOptions)
  const userId = session?.user && await session.user.id
  const userInRoom = (roomId: Number) => {
    const room = allRooms.find(room => room.id === roomId)
    if (room) {
      return room.users.some(user => user.id === userId)
    }
    return false
  }
  const allCategories = allRooms.map(room => room.category) as Category[]
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '5'
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page) // 5, 10, 15 ...
  const entries = allRooms.slice(start, end)
  const showJoined = searchParams['joined'] === 'true'
  const category = searchParams['category'] ?? 'all'
  let displayedRooms = entries
  if (showJoined) {
    displayedRooms = displayedRooms.filter((room) => userInRoom(room.id));
  }
  if (category !== 'all') {
    displayedRooms = displayedRooms.filter((room) => room.category.id === Number(category));
  }

  return (
    <section className='px-4 xl:px-0 container max-w-7xl h-full mx-auto flex flex-col'>
      <div className="flex flex-col md:flex-row justify-between pb-10 border-b-2 border-slate-400 dark:border-neutral-700">
        <div className="w-full md:w-1/2">
          <h1 className='text-4xl font-bold mb-3'>Rooms</h1>
          <p>
            Here, you can engage in real-time conversations with other users. You can simply enter various chat rooms and start typing away to connect with like-minded individuals or explore diverse interests.
          </p>
        </div>
        <div className="w-full mt-6 md:mt-0 md:w-1/2 flex justify-end items-end">
          <Link href='/rooms/new' className='px-3 py-2 text-sm rounded-md bg-primary hover:bg-primary/80 flex items-center text-white font-medium max-w-fit'> <Plus className='w-4 h-4 mr-2' /> Create Room</Link>
        </div>
      </div>
      <div className="flex gap-8 my-10">
        <FilteringControls categories={allCategories} />
        <span>Search rooms...</span>
        {category === 'all' ? <div>all rooms</div> : <div>CategoryID{category}</div>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayedRooms.map((room) => (
          <>
            {<RoomCard key={room.id} room={room} userId={userId!} userInRoom={userInRoom(room.id)} />}
          </>
        ))}
      </div>
      <div className='flex flex-col gap-2 items-center py-8'>
        <PaginationControls
          hasNextPage={end < allRooms.length}
          hasPrevPage={start > 0}
        />
      </div>
    </section>
  )
}

export default page