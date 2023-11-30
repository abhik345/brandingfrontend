import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeToPageName = {
    "/home": "Home",
    "/all-assignment": "Assignment List",
    "/create-category" : "Category",
    "/create-location" : "Location",
    "/create-user" : "Create User"
  };

  const pathname = location.pathname;
  const pageName = routeToPageName[pathname] || "";
  return (
    <div className="block-header">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <h2>{pageName}</h2>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">
                <i className="fa fa-dashboard" />
              </a>
            </li>
            <li className="breadcrumb-item">Dashboard</li>
            <li className="breadcrumb-item active">{pageName}</li>
          </ul>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="d-flex flex-row-reverse">
            <div className="page_action">
              {pathname === "/home" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/all-assignment")}
                >
                  <i className="fa fa-download" /> Assignment List
                </button>
              ) : null}
              {pathname === "/all-assignment" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/all-assignment")}
                >
                  <i className="fa fa-download" /> Create Assignment
                </button>
              ) : null}
            </div>
            <div className="p-2 d-flex"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BreadCrumb };
