import { useEffect } from 'react'

const DeleteCardPopup = ({ deletePopup, setDeletePopup, handleDeleteCard }: { deletePopup: boolean, setDeletePopup: (deletePopup: boolean) => void, handleDeleteCard: () => void }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDeletePopup(false)
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
      setDeletePopup(false);
    }
  },[setDeletePopup])

  return (
    <>
     {deletePopup && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 z-100 flex justify-center items-center">
      <div className="relative bg-white text-black px-12 py-8 allpopups">
          <h2 className="uppercase text-center text-xl font-bold">Delete Card?</h2>
          <div className="flex gap-4 justify-center mt-4">
            <button onClick={() => setDeletePopup(false)}  className='bg-black hover:bg-black/80 cursor-pointer text-white font-bold py-2 px-4 rounded mt-8' type="submit">NO, CANCEL</button>
            <button onClick={handleDeleteCard} className='bg-red-600 hover:bg-black/80 cursor-pointer text-white font-bold py-2 px-4 rounded mt-8' type="submit">YES, DELETE</button>
          </div>
        </div>
      </div>}
    </>
  )
}

export default DeleteCardPopup
