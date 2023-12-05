import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Home, Login, PageNotFound,AssignmentListing,CreateMaster,CreateUser, User } from "../pages"
import { CreateCategory } from '../pages/master/CreateCategory';
import CreateLocation from '../pages/master/CreateLocation';
import CreateSubcategory from '../pages/master/CreateSubcategory';
import CreateArea from '../pages/master/CreateArea';

const AllRoutes = () => {
  return (
   <>
   
   <Router>
    <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/all-assignment' element={<AssignmentListing/>}/>
        <Route path='/create-category' element={<CreateCategory/>}/>
        <Route path='/create-location' element={<CreateLocation/>}/>
        <Route path='/create-subcategory' element={<CreateSubcategory/>}/>
        <Route path='/create-area' element={<CreateArea/>}/>
        <Route path='/users' element={<User/>}/>
        <Route path='/create-master' element={<CreateMaster/>}/>
        <Route path='/create-user' element={<CreateUser/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
   </Router>
   
   </>
  )
}

export default AllRoutes