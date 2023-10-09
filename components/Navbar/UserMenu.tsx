'use client'
import { FC, useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useRentModal from '@/app/hooks/useRentModal'


interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setOpen] = useState(false)


  const handleToggleOpen = useCallback(() => {
    setOpen(value => !value)
  }, [isOpen])

  const onRent = () => {
    if(!currentUser)  {
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={handleToggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px]
          border-neutral-100
          flex
          items-center
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition
          "
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {
        isOpen && (
          <div
            className='absolute
              right-0
              top-12
              rounded-xl
              shadow-md
              w-[40vw]
              bg-white
              overflow-hidden
              text-sm'
          >
            <div className='flex flex-col cursor-pointer'>
              {
                currentUser ? (
                  <>
                    <MenuItem
                      onClick={() => { }}
                      label='My trips'
                    />
                    <MenuItem
                      onClick={() => { }}
                      label='My favorites'
                    />
                    <MenuItem
                      onClick={() => { }}
                      label='My reservations'
                    />
                    <MenuItem
                      onClick={() => { }}
                      label='My properties'
                    />
                    <MenuItem
                      onClick={rentModal.onOpen}
                      label='Airbnb my home'
                    />
                    <hr />
                    <MenuItem
                      onClick={() => signOut()}
                      label='Logout'
                    />
                  </>
                ) : (
                  <>
                    <MenuItem
                      onClick={loginModal.onOpen}
                      label='Login'
                    />
                    <MenuItem
                      onClick={registerModal.onOpen}
                      label='Sign Up'
                    />
                  </>
                )
              }

            </div>
          </div>
        )
      }
    </div >
  )
}

export default UserMenu