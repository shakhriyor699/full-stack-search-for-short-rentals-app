'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BsHouseLock } from "react-icons/bs"

const Logo = () => {
  const router = useRouter()
  return (
    // <Image onClick={() => router.push('/')} src='/images/logo.png' alt='Logo' className="hidden md:block cursor-pointer" height={100} width={100} />
    <BsHouseLock onClick={() => router.push('/')} size={50} className="hidden md:block cursor-pointer  fill-rose-500" />
  )
}

export default Logo