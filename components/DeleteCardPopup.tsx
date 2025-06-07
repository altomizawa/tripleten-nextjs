

const DeleteCardPopup = ({ deletePopup, setDeletePopup, handleDeleteCard }: { deletePopup: boolean, setDeletePopup: (deletePopup: boolean) => void, handleDeleteCard: () => void }) => {

  return (
    <>
     {deletePopup && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 z-100 flex justify-center items-center">
      <div className="relative bg-white text-black w-[400px] h-[300px] p-4 flex flex-col items-center justify-center">
          <h2 className="uppercase text-center text-xl font-bold">Delete Card?</h2>
          <div className="flex gap-4">
            <button onClick={() => setDeletePopup(false)}  className='bg-black hover:bg-black/80 cursor-pointer text-white font-bold py-2 px-4 rounded mt-8' type="submit">NO, CANCEL</button>
            <button onClick={handleDeleteCard} className='bg-red-600 hover:bg-black/80 cursor-pointer text-white font-bold py-2 px-4 rounded mt-8' type="submit">YES, DELETE</button>
          </div>
        </div>
      </div>}
    </>
  )
}

export default DeleteCardPopup
