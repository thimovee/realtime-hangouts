import Navbar from '@/components/nav/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Code Connect',
  description: 'A social network for developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} lang="en">
      <body className="bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-slate-100">
        <Providers>
          <Navbar />
          <main className="pt-[70px]">{children}</main>
          {/*<div className="fixed bottom-4 right-4 bg-orange-500 text-white p-2 rounded  sm:hidden">Extra Small Screen (xs)</div>
          <div className="fixed bottom-4 right-4 bg-sky-500 text-white p-2 rounded hidden sm:block md:hidden">Small Screen (sm)</div>
          <div className="fixed bottom-4 right-4 bg-yellow-500 text-white p-2 rounded hidden md:block lg:hidden">Medium Screen (md)</div>
          <div className="fixed bottom-4 right-4 bg-purple-500 text-white p-2 rounded hidden lg:block xl:hidden">Large Screen (lg)</div>
          <div className="fixed bottom-4 right-4 bg-emerald-500 text-white p-2 rounded hidden xl:block 2xl:hidden">Extra Large Screen (xl)</div>
          <div className="fixed bottom-4 right-4 bg-teal-500 text-white p-2 rounded hidden 2xl:block">2X Large Screen (2xl)</div>
  */}
        </Providers>
      </body>
    </html>
  )
}
