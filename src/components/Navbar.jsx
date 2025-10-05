import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import lob from '../assets/lobss.png'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery ,getCartCount} = useAppContext();

  const logout = async () => {
    setUser(null);
    navigate('/')
  }

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products")
    }
  }, [searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img
          className="h-9"
          style={{ width: "200px", height: "46px" }}
          src={lob}
          alt="Logo"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products'>All product</NavLink>
        <NavLink to='/contact'>Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => { setShowUserLogin(true) }}
            className="cursor-pointer px-8 py-2 bg-primary-dull hover:bg-primary transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li onClick={() => navigate("my-orders")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                My orders
              </li>
              <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                LogOut
              </li>
            </ul>
          </div>
        )}
      </div>
  

    <div className='flex items-center gap-6 sm:hidden'>
       <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>
        <button onClick={()=> open ? setOpen(false): setOpen(true)} aria-label="Menu" className='sm:hidden'>
          <img src={assets.menu_icon} alt="" />
        </button>

    </div>


      {/* Mobile Menu */}
      {open && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden z-50"
        >
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to='/products' onClick={() => setOpen(false)}>All Product</NavLink>
          {user && <NavLink to="/products" onClick={() => setOpen(false)}>My Orders</NavLink>}
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary-dull hover:bg-primary transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary-dull hover:bg-primary transition text-white rounded-full text-sm"
            >
              LogOut
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
