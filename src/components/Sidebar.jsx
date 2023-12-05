/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const toggleActiveClass = (index) => {
    const currentActiveItem = document.querySelector(
      `#main-menu > li:nth-child(${index + 1})`
    );
    if (currentActiveItem) {
      currentActiveItem.classList.toggle("active");
    }
  };

  const handleClick = (index) => {
    setActiveItem(index);
    setTimeout(() => {
      const currentActiveItem = document.querySelector(
        `#main-menu > li:nth-child(${index + 1})`
      );
      if (currentActiveItem) {
        const hasActiveClass = currentActiveItem.classList.contains("active");
        if (!hasActiveClass) {
          toggleActiveClass(index);
        }
      }
    }, 0);
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
                    <Link to="/home" onClick={() => handleClick(0)}>
                      <i className="fa fa-dashboard" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className={activeItem === 1 ? "active" : ""}>
                    <Link to="/create-master" onClick={() => handleClick(1)}>
                      <i className="fa fa-puzzle-piece" />
                      <span>Create Master</span>
                    </Link>
                    <ul>
                      <li>
                        <Link to="/create-category">Create Category</Link>
                      </li>
                      <li>
                        <Link to="/create-subcategory">Create Subcategory</Link>
                      </li>
                      <li>
                        <Link to="/create-location">Create Location</Link>
                      </li>

                      <li>
                        <Link to="/create-area">Create Area</Link>
                      </li>
                      {/* <li>
                        <a href="ui-icons.html">Icons</a>
                      </li> */}
                    </ul>
                  </li>
                  <li
                    className={activeItem === 2 ? "active" : ""}
                    style={{ marginBottom: "10px" }}
                  >
                    <Link to="/create-user" onClick={() => handleClick(2)}>
                      <i className="fa fa-dashboard" />
                      <span>Create User</span>
                    </Link>
                  </li>
                  <li
                    className={activeItem === 3 ? "active" : ""}
                    style={{ marginBottom: "10px" }}
                  >
                    <Link to="/users" onClick={() => handleClick(3)}>
                      <i className="fa fa-dashboard" />
                      <span>User List</span>
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
