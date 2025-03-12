import React, { useState } from 'react'
import logo from "../assets/logo.png"
import useMobile from '../hooks/useMobile'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Search from './Search'
import { FaRegCircleUser } from "react-icons/fa6"
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux"
import { GoTriangleDown, GoTriangleUp } from "react-icons/go"
import UserMenu from './UserMenu'

//import { useSelector } from 'react-redux'

const Header = () => {

  const [ isMobile ] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === '/search'
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  const [openUserMenu, setOpenUserMenu] = useState(false)

  console.log("user from store",user);
  
  //const user = useSelector(state => state.cartItem.cart)

  const redirectToLoginPage = () => {
    navigate('/login')
  }

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
    if(!user._id) {
      navigate('/login')
      return
    }

    navigate('/user')

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
              <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                <FaRegCircleUser size={26}/>
              </button>
              {/* desktop part */}
              <div className='hidden lg:flex items-center gap-10'>
                {
                  user?._id ? (
                    <div className='relative'>
                      <div onClick={() => setOpenUserMenu(prev => !prev)} className="flex select-none items-center gap-1 cursor-pointer">
                        <p>Account</p>
                        {
                          openUserMenu ? (
                            <GoTriangleUp size={25} />
                          ) : (
                            <GoTriangleDown size={25}/>
                          )
                        }
                         
                      </div>
                      {
                        openUserMenu && (
                          <div className="absolute right-0 top-12">
                            <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                              <UserMenu close={handleCloseUserMenu}/>
                            </div>
                          </div>
                        )
                      }
                      
                    </div>
                  ) : (
                    <button className='text-lg px-2' onClick={redirectToLoginPage}>Login</button>
                  )
                }
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