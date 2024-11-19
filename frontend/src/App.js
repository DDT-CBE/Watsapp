import React, { Fragment, useEffect, useState } from 'react'
import {ToastContainer}from "react-toastify"
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import Findyourmatch from './Components/FindyourMatch/Findyourmatch';
import Enquiry from './Components/Enquiry/Enquiry';
import Contact from './Components/Contact/Contact';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import From from './Components/Form/Form';
import Sellerform from './Components/Form/Sellerform';
import 'react-toastify/dist/ReactToastify.css';
import Franchisepage from './Components/FranchisePage/Franchisepage';
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup';
import Influencer from './Components/Influencer/Influencer';
import Youtubeip from './Components/Youtubeip/Youtubeip';
import Watsapp from './Components/Watsapp/Watsapp';
import Instagramip from './Components/Instagramip/Instagram';
import IndustryCategories from './Components/industryCategory/industryCategory';



const App = () => {



  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 3000);
  }, []);

  if (loading) {
    return <div className='loader'></div>; 
  }

  return (


  <BrowserRouter>
  
  
    <Routes>
    
          <Route path='/' element={
            <Fragment>
            <Nav />
            <Home />
            {/* <Findyourmatch/> */}
            <Enquiry />
            <Contact />
          </Fragment>  }>
          </Route>
          <Route path='/influencer' element={<Influencer />}></Route>
          <Route path='/youtubeip' element={<Youtubeip />}></Route>
          <Route path='/watsapp' element={ <Influencer/> }></Route>
          <Route path='/watsappgroup' element={ <IndustryCategories/> }></Route>
          <Route path='/profile' element={ <Watsapp/> }></Route>
          <Route path='/form/watsapp' element={ <Sellerform/> }></Route>
          <Route path='/instagramip' element={<Instagramip/>}></Route>
          <Route path='/watsappip' element={ <Franchisepage/> }></Route>
          <Route path='/form/buyer' element={  <From /> }></Route>
          <Route path='/form/seller' element={<Sellerform />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
   
        
         
        
    </Routes>   
    <ToastContainer />
</BrowserRouter>

   
  )
}

export default App