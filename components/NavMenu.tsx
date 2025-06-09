import { sanitizedUser } from '@/lib/types'
import Image from 'next/image'
import { logout } from '@/lib/auth'
import UserFormPopup from './UserFormPopup'
import { useState } from 'react'

const NavMenu = ({ isMenuOpen, setIsMenuOpen, user }: { isMenuOpen: boolean, setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>, user: sanitizedUser }) => {
  const [editProfilePopup, setEditProfilePopup] = useState<boolean>(false);

  return (
    <>
      {isMenuOpen &&<div className='allpopups md:hidden fixed top-0 left-0 w-screen h-screen bg-white z-20 flex flex-col items-center justify-center text-black'>
        <UserFormPopup editProfilePopup={editProfilePopup} setEditProfilePopup={setEditProfilePopup} user={user} />
        <button className='absolute top-4 left-4' onClick={() => setIsMenuOpen(false)}>close</button>
        <Image src='/bradpitt.webp' alt='bradpitt' width={75} height={75} className='rounded-full mb-4' />
        <ul className='flex flex-col gap-8 mt-12'>
          <li onClick={() => setEditProfilePopup(true)} className='font-bold uppercase text-2xl text-center cursor-pointer'>Profile</li>
          <li onClick={logout} className='font-bold uppercase text-2xl text-center cursor-pointer'>logout</li>
        </ul>
      </div>}
    </>
  )
}

export default NavMenu
