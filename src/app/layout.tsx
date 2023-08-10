import Navbar from '@/components/nav/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import { Toaster } from "@/components/ui/Toaster"
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
      <body className="bg-background text-slate-900 dark:text-slate-100">
        <Providers>
          <Navbar />
          <main className="pt-[70px]">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
