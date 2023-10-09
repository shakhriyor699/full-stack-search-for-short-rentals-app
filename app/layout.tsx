import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import RegisterModal from '@/components/Modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from '@/components/Modals/LoginModal'
import { getCurrentUser } from './actions/getCurrentUser'
import RentModal from '@/components/Modals/RentModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirBnb App',
  description: 'AirBnb project',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <LoginModal />
        <RentModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
