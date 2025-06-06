'use client'
import Image from "next/image"
import { useEffect } from "react"
import { Card } from "@/lib/types" 



const Popup = ({ slide, setIsPopupOpen }: { slide: Card , setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
})
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-20 z-10">
      <div className="w-[600px] h-[600px] relative">
        <button onClick={() => setIsPopupOpen(false)}  className='absolute -top-8 right-0 cursor-pointer duration-300 hover:text-gray-400'>close X</button>
        <Image width={600} height={400} className='w-[600px] h-max-[300px]' src={slide.imageUrl} alt={slide.description} />
        <p className="text-white">{slide.title}</p>
      </div>
    </div>
  )
}

export default Popup
