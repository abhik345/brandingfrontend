import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { BreadCrumb } from "./BreadCrumb";

const Layout = ({ children }) => {
  return (
    <>
    
      <div id="wrapper" class="theme-cyan">
        <Navbar />
        <Sidebar />
        <div id="main-content">
          <div class="container-fluid">
            <BreadCrumb/>
            {children}</div>
        </div>
      </div>
    </>
  );
};

export { Layout };
