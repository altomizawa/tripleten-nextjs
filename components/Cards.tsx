'use client'
import { useState } from 'react'
import Image from 'next/image'
// import desert from '@/public/desert.jpg'
// import egypt from  '@/public/egypt.jpg'
// import veniceBeach from '@/public/venicebeach.jpg' 
// import greece from '@/public/greece.jpg'
import { Heart , Trash} from 'lucide-react'
import Popup from './Popup'
import { Card } from '@/lib/types'
import { deleteCard } from '@/actions/cardActions'
import { toast } from 'sonner'
import { Toaster } from './ui/sonner'
import DeleteCardPopup from './DeleteCardPopup'


const Cards = ({ cards }: { cards: Card[] }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [slide, setSlide] = useState<Card>()
  const [deletePopup, setDeletePopup] = useState<boolean>(false)
  const [currentId, setCurrentId] = useState<string>()


  const handlePopup = (slide: Card) => {
    setSlide(slide)
    setIsPopupOpen(true)
  }

  const handleDeleteCardPopup = async (id: string) => {
    setDeletePopup(true)
    setCurrentId(id)
  }

  const handleDeleteCard = async () => {
    const response = await deleteCard(currentId)
    if (response.success) {
      setCurrentId(undefined)
      toast(response.message)
    } else {
      toast.error(response.message)
    }
    setDeletePopup(false)
  }

  return (
    <div className='flex gap-24 px-12 mt-16 flex-wrap justify-center md:justify-left'>
      <div className='absolute'>
        <Toaster richColors position='top-center' />
      </div>
      <DeleteCardPopup deletePopup={deletePopup} setDeletePopup={setDeletePopup} handleDeleteCard={handleDeleteCard}  />

      {isPopupOpen && <Popup slide={slide} setIsPopupOpen={setIsPopupOpen} />}
      {cards?.map((item: Card, index: number) => (
        <div key={index} className='overflow-hidden rounded-xl relative'>
          <button onClick={() => handleDeleteCardPopup(item._id)} className='absolute top-4 right-4 cursor-pointer hover:opacity-70'><Trash /></button>
          <Image onClick={() => handlePopup(item)} width={400} height={350} className='w-[400px] h-[350px] object-cover cursor-pointer' src={item.imageUrl} alt={`Image ${index + 1}`} />
          <div className='flex justify-between items-center bg-white px-8 py-6 rounded-b-xl'>
            <h2 className='text-black font-bold text-xl'>{item.title}</h2>
            <div className='flex flex-col items-center gap-1'>
              <Heart className='w-4 h-4' color='red' />
              <p className='text-black text-sm'>{item.likes}</p>
            </div>
          </div>
        </div>
          
      ))}
    </div>
  )
}

export default Cards
