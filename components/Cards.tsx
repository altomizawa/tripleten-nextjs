'use client'
import { useState } from 'react'
import Image from 'next/image'
import desert from '@/public/desert.jpg'
import egypt from  '@/public/egypt.jpg'
import veniceBeach from '@/public/venicebeach.jpg' 
import greece from '@/public/greece.jpg'
import { Heart } from 'lucide-react'
import Popup from './Popup'


const Cards = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [slide, setSlide] = useState(null)

  const handlePopup = (slide) => {
    setSlide(slide)
    setIsPopupOpen(true)
  }

  const images = [
    {
      name: 'desert',
      image: desert
    },
    {
      name: 'egypt',
      image: egypt
    },
    {
      name: 'veniceBeach',
      image: veniceBeach
    },
    {
      name: 'greece',
      image: greece
    },
    {
      name: 'desert',
      image: desert
    },
    {
      name: 'egypt',
      image: egypt
    },
    {
      name: 'veniceBeach',
      image: veniceBeach
    },
    {
      name: 'greece',
      image: greece
    },
    {
      name: 'desert',
      image: desert
    },
    {
      name: 'egypt',
      image: egypt
    },
    {
      name: 'veniceBeach',
      image: veniceBeach
    },
    {
      name: 'greece',
      image: greece
    }
  ]

  return (
    <div className='flex gap-24 px-12 mt-16 flex-wrap justify-center md:justify-left'>
      {isPopupOpen && <Popup slide={slide} setIsPopupOpen={setIsPopupOpen} />}
      {images.map((item, index) => (
        <div key={index} className='overflow-hidden rounded-xl'>
          <Image onClick={() => handlePopup(item)} className='w-[400px] h-[350px] object-cover cursor-pointer' src={item.image} alt={`Image ${index + 1}`} />
          <div className='flex justify-between items-center bg-white px-8 py-6 rounded-b-xl'>
            <h2 className='text-black font-bold text-xl'>{item.name}</h2>
            <div className='flex flex-col items-center gap-1'>
              <Heart className='w-4 h-4' color='red' />
              <p className='text-black text-sm'>0</p>
            </div>
          </div>
        </div>
          
      ))}
    </div>
  )
}

export default Cards
