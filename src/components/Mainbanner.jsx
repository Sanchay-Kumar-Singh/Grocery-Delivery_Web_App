import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import banner from '../assets/Screenshot 2025-12-04 022037-Picsart-AiImageEnhancer.png'
const Mainbanner = () => {
  return (
    <div className='relative'>
        <img src={banner} alt="banner" className='w-full hidden md:block' />
          <img  src={assets.main_banner_bg_sm} alt="banner" className='w-full  md:hidden' />

          <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24 '>
            <h1 className='sm:hidden -mb-80 text-3xl  font-blod text-center  max-w-72  leading-tight  '>Grocery Mart -Selling Fresh Fruit and Vegetables.</h1>
      
          <div className='flex items-center mt-86 font-medium'>
           <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white  cursor-pointer'>Shop Now
            <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="img" />
           </Link>
           <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>Explore Deals
            <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="img" />
           </Link>
               </div>
          </div>
    </div>

  )
}

export default Mainbanner