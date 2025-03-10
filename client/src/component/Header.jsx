import React from 'react'
import logo from "../assets/logo.png"
import useMobile from '../hooks/useMobile'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Search from './Search'
import { FaRegCircleUser } from "react-icons/fa6"
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux"

//import { useSelector } from 'react-redux'

const Header = () => {

  const [ isMobile ] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === '/search'
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)

  console.log("user from store",user);
  
  //const user = useSelector(state => state.cartItem.cart)

  const redirectToLoginPage = () => {
    navigate('/login')
  }


  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center h-full px-2 justify-between'>
            {/* logo */}
            <div className="h-full">
              <Link to={"/"} className="h-full flex justify-center items-center ">
                <img src={logo} alt="" width={170} height={60} className='hidden lg:block' />
                <img src={logo} alt="" width={120} height={60} className='lg:hidden' />
              </Link>
            </div>

            {/* search */}
            <div className="hidden lg:block" >
              <Search />
            </div>

            {/* login and my cart */}
            <div>
              {/* user icon display in mobile  */}
              <button className='text-neutral-600 lg:hidden'>
                <FaRegCircleUser size={26}/>
              </button>
              {/* desktop part */}
              <div className='hidden lg:flex items-center gap-10'>
                <button className='text-lg px-2' onClick={redirectToLoginPage}>Login</button>
                <button className='flex items-center gap-2 bg-secondary-200 px-2 py-1 rounded text-white'>
                  <div className="animate-bounce">
                    <BsCart4 size={26}/>
                  </div>
                  <div className='font-semibold'>
                    <p>My cart</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )
      }
      
      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>
    </header>
  )
}

export default Header