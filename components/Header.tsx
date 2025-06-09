'use client'
import { logout } from "@/lib/auth"
import { sanitizedUser } from "@/lib/types"
import { useState } from "react"
import LogoutPopup from "./LogoutPopup"
import { Menu } from "lucide-react"
import NavMenu from "./NavMenu"


const Header = ( {user}: {user: sanitizedUser}) => {
  const [logoutPopup, setLogoutPopup] = useState<boolean>(false)
  const[isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleLogout = () => {
    setLogoutPopup(true)
    setIsMenuOpen(false)
  }
  
  return (
    <header className="flex justify-between py-12 border-b-[1px] border-gray-200 px-12">
      <NavMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} user={user} />
      <LogoutPopup logoutPopup={logoutPopup} setLogoutPopup={setLogoutPopup} logout={logout} />
      <h1 className="text-xl text-center md:text-left w-full md:text-3xl font-bold">Around the US</h1>
      <Menu width={24} height={24} onClick={() => setIsMenuOpen(true)} className="md:hidden cursor-pointer"/>
      <div className="hidden md:flex items-center gap-12">
        <p>{user.email}</p>
        <button onClick={handleLogout} className="text-gray-500 hover:text-gray-200 cursor-pointer">Logout</button> 
      </div>
    </header>
  )
}

export default Header
