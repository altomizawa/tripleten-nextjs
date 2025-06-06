import { addCard } from "@/actions/cardActions"

const CardFormPopup =  ({isPopupOpen, setIsPopupOpen}: {isPopupOpen: boolean, setIsPopupOpen: (isPopupOpen: boolean) => void}) => {



  const handleFormSubmit = async (formData: FormData) => {
    setIsPopupOpen(false)
    addCard(formData)
  }

  return (
    <>
      {isPopupOpen && <dialog className="fixed top-0 left-0 w-full h-full bg-black/90  flex justify-center items-center">
        <form action={handleFormSubmit} className="relative">
          <p className='absolute top-2 right-4 text-black hover:underline cursor-pointer' onClick={() => setIsPopupOpen(false)}>close</p>
          <input name='title' type="text" placeholder="Title" />
          <input name='description' type="text" placeholder="Description" />
          <input name='imageUrl' type="text" placeholder="Image URL" />
          <button className='bg-black hover:bg-black/80 cursor-pointer text-white font-bold py-2 px-4 rounded' type="submit">Submit</button>
        </form>
      </dialog>}
    </>
  )
}

export default CardFormPopup
