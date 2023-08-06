"use client"
import React, { FC } from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation"
import { cn } from '@/lib/utils'


const NavItems: FC = () => {
  const pathname = usePathname()
  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      <a href="/rooms" className={cn("transition-colors hover:text-[#09090bcc] dark:hover:text-[#fafafacc]", pathname?.startsWith("/rooms") ? "text-[#09090b] dark:text-[#FAFAFA]" : "text-[#09090b99] dark:text-[#fafafa99]")}>
        Rooms
      </a>
      <Link target='_blank' href="https://github.com/thimovee/realtime-hangouts" className="transition-colors text-[#09090b99] dark:text-[#fafafa99] hover:text-[#09090bcc] dark:hover:text-[#fafafacc]">
        Github
      </Link>
    </nav>
  );
}

export default NavItems