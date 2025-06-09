'use client'
import { logout } from "@/lib/auth"
import { sanitizedUser } from "@/lib/types"
import { useState } from "react"
import LogoutPopup from "./LogoutPopup"


const Header = ( user: sanitizedUser) => {
  const [logoutPopup, setLogoutPopup] = useState<boolean>(false)

  const handleLogout = () => {
    setLogoutPopup(true)
  }
  return (
    <header className="flex justify-between py-12 border-b-[1px] border-gray-200 px-12">
      <LogoutPopup logoutPopup={logoutPopup} setLogoutPopup={setLogoutPopup} logout={logout} />
      <h1 className="text-3xl font-bold">Around the US</h1>
      <div className="flex items-center gap-12">
        <p>{user.user.email}</p>
        <button onClick={handleLogout} className="text-gray-500 hover:text-gray-200 cursor-pointer">Logout</button> 
      </div>
    </header>
  )
}

export default Header
