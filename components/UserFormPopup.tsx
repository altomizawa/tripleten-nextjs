import { Toaster } from "./ui/sonner"
import { toast } from "sonner"
const UserFormPopup =  ({isPopupOpen, setIsPopupOpen}: {isPopupOpen: boolean, setIsPopupOpen: (isPopupOpen: boolean) => void}) => {

  const handleFormSubmit = async (formData: FormData) => {
    setIsPopupOpen(false)
    const response = await addCard(formData)
    if (response.success) {
      console.log(response.message)
      toast(response.message)
    } else {
      console.log(response.message)
      toast.error(response.message)
    }

  }

  return (
    <>
      {isPopupOpen && <dialog className="fixed top-0 left-0 w-full h-full bg-black/90 flex justify-center items-center z-10">
        <Toaster richColors position="top-center" />
        <form action={handleFormSubmit} className="relative">
          <p className='absolute -top-8 right-0 text-white hover:underline cursor-pointer' onClick={() => setIsPopupOpen(false)}>close X</p>
          <h2 className='text-xl font-bold text-center mb-12'>ADD NEW LOCATION</h2>
          <input name='title' type="text" placeholder="Title" required />
          <input name='description' type="text" placeholder="Description" required/>
          <input name='imageUrl' type="text" placeholder="Image URL" required/>
          <button className='bg-black hover:bg-black/80 cursor-pointer text-white font-bold py-2 px-4 rounded mt-8' type="submit">Submit</button>
        </form>
      </dialog>}
    </>
  )
}

export default UserFormPopup
