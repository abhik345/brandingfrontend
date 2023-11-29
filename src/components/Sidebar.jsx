/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);

  const handleLiClick = (index) => {
    setActiveItem(index);
  };

  return (
    <>
      <div id="left-sidebar" className="sidebar">
        <button type="button" className="btn-toggle-offcanvas">
          <i className="fa fa-arrow-left" />
        </button>
        <div className="sidebar-scroll">
          <div className="user-account">
            <img
              src="assets/images/user.png"
              className="rounded-circle user-photo"
              alt="User Profile Picture"
            />
            <div className="dropdown">
              <span>Welcome,</span>
              <a
                href=""
                className="dropdown-toggle user-name"
                data-toggle="dropdown"
              >
                <strong>Pamela Petrus</strong>
              </a>
              <ul className="dropdown-menu dropdown-menu-right account">
                <li>
                  <a href="page-profile2.html">
                    <i className="icon-user" />
                    My Profile
                  </a>
                </li>
                <li>
                  <a href="app-inbox.html">
                    <i className="icon-envelope-open" />
                    Messages
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="icon-settings" />
                    Settings
                  </a>
                </li>
                <li className="divider" />
                <li>
                  <a href="page-login.html">
                    <i className="icon-power" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <hr />
          </div>
          <div className="tab-content padding-0">
            <div className="tab-pane active" id="menu">
              <nav id="left-sidebar-nav" className="sidebar-nav">
                <ul id="main-menu" className="metismenu">
                  <li
                    className={activeItem === 0 ? "active" : ""}
                    style={{ marginBottom: "10px" }}
                  >
                    <Link to="/home" onClick={() => handleLiClick(0)}>
                      <i className="fa fa-dashboard" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className={activeItem === 1 ? "active" : ""}>
                    <Link
                      to="/create-master"
                      onClick={() => {
                        handleLiClick(0);
                      }}
                    >
                      <i className="fa fa-puzzle-piece" />
                      <span>Create Master</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Sidebar };
