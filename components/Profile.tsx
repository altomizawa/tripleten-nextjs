'use client'
import { Pencil } from "lucide-react"
import Image from "next/image"
import CardFormPopup from "./CardFormPopup"
import { useState } from "react"

const Profile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true)
  return (
    <div className="px-12 mt-16 flex justify-between items-center">
      <CardFormPopup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
      <div className="flex items-center gap-8">
        <div className="overflow-hidden rounded-full w-36 h-36">
          <Image src='/bradpitt.webp' alt='bradpitt' width={200} height={200} />
        </div>
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Al Tomizawa</h1>
            <button className="p-1 border-[1px] border-gray-200 cursor-pointer">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <p>Superstar</p>
        </div>
      </div>
      <p onClick={() => setIsPopupOpen(true)} className="text-4xl font-extralight px-16 py-1.5 border-[1px] border-white cursor-pointer hover:bg-white hover:text-black duration-500">+</p>
    </div>
  )
}

export default Profile
