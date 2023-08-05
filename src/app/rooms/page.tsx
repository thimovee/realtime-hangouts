import { Button } from '@/components/ui/Button'
import { db } from '@/lib/db'
import React from 'react'
import { Plus } from 'lucide-react'
import RoomCard from '@/components/ui/RoomCard'
import { ExtentedRoom } from '@/types/room'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
const page = async () => {
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
          <Button className='w-full md:max-w-fit' variant="cta"><Plus className='w-4 h-4 mr-2' /> Create Room</Button>
        </div>
      </div>
      <div className="flex gap-8 my-10">
        <span>Categories V</span>
        <span>Search rooms...</span>
        <span>
          <input type="checkbox" className='mr-2' />
          Only show rooms I&apos;m in
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allRooms.map((room) => (
          // @ts-ignore
          <RoomCard key={room.id} room={room} userId={userId} userInRoom={userInRoom(room.id)} />
        ))}
      </div>
    </section>
  )
}

export default page