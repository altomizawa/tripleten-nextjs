


const Header = () => {
  console.log("Header component rendered")
  return (
    <header className="flex justify-between py-12 border-b-[1px] border-gray-200 px-12">
      <h1 className="text-3xl font-bold">Around the US</h1>
      <div className="flex items-center gap-12">
        <p>alyssontomizawa@hotmail.com</p>
        <button className="text-gray-500 hover:text-gray-200 cursor-pointer">Logout</button>
      </div>
    </header>
  )
}

export default Header
