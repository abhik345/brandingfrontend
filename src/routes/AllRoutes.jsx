import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Login,
  PageNotFound,
  AssignmentListing,
  CreateMaster,
  CreateUser,
  User,
  CreateVendor,
  Vendors,
  CreateAssignments,
  VendorDetails,
  UserDetails,
  AssignmentDetails,
} from "../pages";
import { CreateCategory } from "../pages/master/CreateCategory";
import CreateLocation from "../pages/master/CreateLocation";
import CreateSubcategory from "../pages/master/CreateSubcategory";
import CreateArea from "../pages/master/CreateArea";
import CreatePlaces from "../pages/master/CreatePlaces";

const AllRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/all-assignment"
            element={
              <ProtectedRoutes>
                <AssignmentListing />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/all-assignment/:id"
            element={
              <ProtectedRoutes>
                <AssignmentDetails />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create-assignment"
            element={
              <ProtectedRoutes>
                <CreateAssignments />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create-category"
            element={
              <ProtectedRoutes>
                <CreateCategory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create-location"
            element={
              <ProtectedRoutes>
                <CreateLocation />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create-subcategory"
            element={
              <ProtectedRoutes>
                <CreateSubcategory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create-area"
            element={
              <ProtectedRoutes>
                <CreateArea />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoutes>
                <User />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoutes>
                <UserDetails />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/vendors"
            element={
              <ProtectedRoutes>
                <Vendors />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/vendors/:id"
            element={
              <ProtectedRoutes>
                <VendorDetails />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create-master"
            element={
              <ProtectedRoutes>
                <CreateMaster />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create-user"
            element={
              <ProtectedRoutes>
                <CreateUser />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create-vendor"
            element={
              <ProtectedRoutes>
                <CreateVendor />
              </ProtectedRoutes>
            }
          />
            <Route
                path="/create-places"
                element={
                    <ProtectedRoutes>
                        <CreatePlaces />
                    </ProtectedRoutes>
                }
            />
          <Route path="/" element={<Login />} />
          <Route
            path="*"
            element={
              <ProtectedRoutes>
                <PageNotFound />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default AllRoutes;

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user_id") || localStorage.getItem("vendor_id")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}
