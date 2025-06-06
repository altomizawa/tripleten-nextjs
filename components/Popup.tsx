'use client'
import Image from "next/image"
import { useEffect } from "react"

type slide = {
  name: string,
  image: string
}



const Popup = ({ slide, setIsPopupOpen }: { slide: slide , setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

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
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-20">
      <div className="w-[600px] h-[600px] relative">
        <button onClick={() => setIsPopupOpen(false)}  className='absolute -top-8 right-2 cursor-pointer duration-300 hover:text-gray-400'>Close</button>
        <Image src={slide.image} alt={slide.name} />
        <p>{slide.name}</p>
      </div>
    </div>
  )
}

export default Popup
