import { Outlet } from "react-router-dom"
import Header from "./component/Header"
import Footer from "./component/Footer"
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from "react"
import fetchUserDetails from "./utils/fetchUserDetail"
import { setUserDetails } from "./store/userSlice"
import { useDispatch } from "react-redux"

function App() {

  const dispatch = useDispatch()

  const fetchUser = async() => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </> 
  )
}

export default App