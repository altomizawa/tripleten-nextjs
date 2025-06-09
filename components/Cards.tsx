'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Heart , Trash} from 'lucide-react'
import Popup from './Popup'
import { Card, sanitizedUser } from '@/lib/types'
import { deleteCard, handleLikes } from '@/actions/cardActions'
import { toast } from 'sonner'
import { Toaster } from './ui/sonner'
import DeleteCardPopup from './DeleteCardPopup'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Cards = ({ cards, user }: { cards: Card[], user: sanitizedUser }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [slide, setSlide] = useState<Card | undefined>()
  const [deletePopup, setDeletePopup] = useState<boolean>(false)
  const [currentId, setCurrentId] = useState<string | undefined>()
  const userId = user.id;

  const handlePopup = (slide: Card) => {
    setSlide(slide)
    setIsPopupOpen(true)
  }

  const handleDeleteCardPopup = async (id: string) => {
    setDeletePopup(true)
    setCurrentId(id)
  }

  const handleDeleteCard = async () => {
     if (!currentId) return;
    const response = await deleteCard(currentId)
    if (response.success) {
      setCurrentId(undefined)
      toast(response.message)
    } else {
      toast.error(response.message)
    }
    setDeletePopup(false)
  }

  const handleCardLikes =  async (cardId: string) => {
    const response = await handleLikes(cardId, userId)
    if (!response.success) {
      toast.error(response.message)
    }
  }

  useGSAP(() => {
    const cards = document.querySelectorAll('.card')
    gsap.from(cards, {
      opacity: 0,
      stagger: 0.2, 
      duration: 2,
    })
  })

  return (
    <div className='flex gap-24 px-12 mt-16 flex-wrap justify-center md:justify-left'>
      <div className='absolute'>
        <Toaster richColors position='top-center' />
      </div>

      {isPopupOpen && <Popup slide={slide} setIsPopupOpen={setIsPopupOpen} />}
      <DeleteCardPopup deletePopup={deletePopup} setDeletePopup={setDeletePopup} handleDeleteCard={handleDeleteCard} />
      {cards?.map((item: Card, index: number) => (
        <div key={index} className='overflow-hidden rounded-xl relative card'>
          {item?.owner === userId && <button onClick={() => handleDeleteCardPopup(item?._id)} className='absolute top-4 right-4 cursor-pointer hover:opacity-70'><Trash /></button>}
          <Image onClick={() => handlePopup(item)} width={400} height={350} className='w-[400px] h-[350px] object-cover cursor-pointer' src={item.imageUrl} alt={`Image ${index + 1}`} />
          <div className='flex justify-between items-center bg-white px-8 py-6 rounded-b-xl'>
            <h2 className='text-black font-bold text-xl'>{item.title}</h2>
            <button onClick={() => handleCardLikes(item._id) } className='flex flex-col items-center gap-1 cursor-pointer'>
              <Heart className='w-4 h-4' color='red' fill={`${item?.likes.includes(userId) ? 'red' : 'none'}`} />
              <p className='text-black text-sm'>{item.likes.length}</p>
            </button>
          </div>
        </div>
          
      ))}
    </div>
  )
}

export default Cards
