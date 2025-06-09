'use client'
import { Pencil } from "lucide-react"
import Image from "next/image"
import CardFormPopup from "./CardFormPopup"
import { useState, useEffect} from "react"
import { getUserfromSession } from "@/actions/userActions";


const Profile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
  const [user, setUser] = useState<any>(null)


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false)
      }
    }
    const fetchUser = async () => {
      const res = await getUserfromSession();
      if (res.success) {
        setUser(res.user);
      }
    }
    if (user === null) {
      fetchUser();
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  
  return (
    <div className="px-12 mt-16 flex justify-between items-center">
      <CardFormPopup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
      <div className="hidden md:flex items-center gap-8">
        <div className="overflow-hidden rounded-full w-36 h-36">
          <Image src='/bradpitt.webp' alt='bradpitt' width={200} height={200} />
        </div>
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <button className="p-1 border-[1px] border-gray-200 cursor-pointer">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <p>Superstar</p>
        </div>
      </div>
      <p onClick={() => setIsPopupOpen(true)} className="w-[400px] md:w-min mx-auto md:mx-0 text-center text-4xl font-extralight px-16 py-1.5 border-[1px] border-white cursor-pointer hover:bg-white hover:text-black duration-500">+</p>
    </div>
  )
}

export default Profile
