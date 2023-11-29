import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Home, Login, PageNotFound,AssignmentListing,CreateMaster } from "../pages"
import { CreateCategory } from '../pages/master/CreateCategory';

const AllRoutes = () => {
  return (
   <>
   
   <Router>
    <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/all-assignment' element={<AssignmentListing/>}/>
        <Route path='/create-category' element={<CreateCategory/>}/>
        <Route path='/create-master' element={<CreateMaster/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
   </Router>
   
   </>
  )
}

export default AllRoutes