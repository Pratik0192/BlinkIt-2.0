import { Outlet } from "react-router-dom"
import Header from "./component/Header"
import Footer from "./component/Footer"
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from "react"
import fetchUserDetails from "./utils/fetchUserDetail"
import { setUserDetails } from "./store/userSlice"
import { useDispatch } from "react-redux"
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice"
import Axios from "./utils/Axios"
import SummaryApi from "./common/SummaryApi"

function App() {

  const dispatch = useDispatch()

  const fetchUser = async() => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async() => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })

      const { data: responseData } = response

      if(responseData.success) {
        dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))))
      }
    } catch (error) {
      
    } finally {
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async() => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })

      const { data: responseData } = response

      if(responseData.success) {
        dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))))
      }

    } catch (error) {
      
    } finally {

    }
  }

  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory
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