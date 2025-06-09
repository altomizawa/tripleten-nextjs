import { Toaster } from "./ui/sonner"
import { toast } from "sonner"
import { sanitizedUser } from "@/lib/types"
import { updateUser } from "@/actions/userActions"

const UserFormPopup =  ({editProfilePopup, setEditProfilePopup, user}: {editProfilePopup: boolean, setEditProfilePopup: (editProfilePopup: boolean) => void, user: sanitizedUser}) => {

  const handleFormSubmit = async (formData: FormData) => {
    setEditProfilePopup(false)
    const response = await updateUser(formData)
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
      {editProfilePopup && <dialog className="allpopups fixed top-0 left-0 w-full h-full bg-black/90 flex justify-center items-center z-10">
        <Toaster richColors position="top-center" />
        <form action={handleFormSubmit} className="relative bg-white flex flex-col w-[90%] md:max-w-[600px] p-12">
          <p className='absolute -top-8 right-0 text-white hover:underline cursor-pointer' onClick={() => setEditProfilePopup(false)}>close X</p>
          <h2 className='text-xl font-bold text-center mb-12'>EDIT PROFILE</h2>
          <label htmlFor="name" className='px-2'>Name:</label>
          <input name='name' type="text" placeholder={user.name}  />
          <label htmlFor="profession" className='px-2 mt-4'>Profession:</label>
          <input name='profession' type="text" placeholder={user.profession}  />
          <label htmlFor="email" className='px-2 mt-4'>Email:</label>
          <input name='email' type="email" placeholder={user.email} />
          <label htmlFor="avatar" className='px-2 mt-4'>Profile Photo:</label>
          <input name='avatar' type="url" placeholder='Profile Photo URL' />
          <button className='bg-black hover:bg-black/80 cursor-pointer text-white font-bold py-2 px-4 rounded mt-8' type="submit">Submit</button>
        </form>
      </dialog>}
    </>
  )
}

export default UserFormPopup
