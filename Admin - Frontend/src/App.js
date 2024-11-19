import React, { Fragment } from 'react'
import Home from './components/home/Home'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Buyercontrol from './components/Buyercontrolpage/Buyercontrol'
import Sellercontrol from './components/Sellercontrolpage/Sellercontrol'
import Editsellerdata from './components/Edit/Editsellerdata'
import Editbuyerdata from './components/Edit/Editbuyerdata'



const App = () => {
  return (
   <Fragment>
     <BrowserRouter>
            <Routes>
                  <Route path='/' element={<Home />}></Route>    
                  <Route path='/buyer' element={<Buyercontrol/>}></Route>    
                  <Route path='/seller' element={<Sellercontrol/>}></Route>    
                  <Route path='/buyeredit' element={<Editbuyerdata/>}></Route>  
                 
                  <Route path='/selleredit' element={<Editsellerdata/>}></Route>    
            </Routes>   
      </BrowserRouter>
   
   </Fragment>
  )
}

export default App