import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { BreadCrumb } from "./BreadCrumb";
import { RightNavbar } from "./RightNavbar";

const Layout = ({ children }) => {
  return (
    <>
      <div id="wrapper" className="theme-cyan">
        <Navbar />
        <Sidebar />
        <RightNavbar />
        <div id="main-content">
          <div className="container-fluid">
            <BreadCrumb />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export { Layout };
