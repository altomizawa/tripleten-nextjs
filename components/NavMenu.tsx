import { sanitizedUser } from '@/lib/types'
import Image from 'next/image'
import { logout } from '@/lib/auth'
import UserFormPopup from './UserFormPopup'
import { useState } from 'react'
import { LogOut } from 'lucide-react'

const NavMenu = ({ isMenuOpen, setIsMenuOpen, user }: { isMenuOpen: boolean, setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>, user: sanitizedUser }) => {
  const [editProfilePopup, setEditProfilePopup] = useState<boolean>(false);

  return (
    <>
      {isMenuOpen &&<div className='allpopups md:hidden fixed top-0 left-0 w-screen h-screen bg-white z-20 flex flex-col items-center justify-center text-black'>
        <UserFormPopup editProfilePopup={editProfilePopup} setEditProfilePopup={setEditProfilePopup} user={user} />
        <button className='absolute top-4 left-4' onClick={() => setIsMenuOpen(false)}>close</button>
        <ul className='flex flex-col gap-8 mt-12 border-l-1 border-black/30'>
          <div className='flex items-center'>
            <Image src={user.avatar} alt='bradpitt' width={50} height={50} className='rounded-full mb-4 ml-4 translate-y-2' />
            <h1 className='text-4xl font-bold uppercase ml-4'>{user.name}</h1>
          </div>
          {/* <div className='h-[1px] bg-black/30 -mt-8'></div> */}
          <li onClick={() => setEditProfilePopup(true)} className='font-bold uppercase text-medium text-right cursor-pointer pl-4 hover:opacity-60'>Profile</li>
          <div className='h-[1px] bg-black/30 -mt-8'></div>
          <button onClick={logout} className='flex gap-2 justify-end hover:opacity-60 cursor-pointer'>
            <li className='text-medium text-right pl-4 flex gap-4'>logout</li>
            <LogOut width={16}/>
          </button>
          <div className='h-[1px] bg-black/30 -mt-8'></div>
        </ul>
      </div>}
    </>
  )
}

export default NavMenu
