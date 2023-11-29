/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isFullWidth, setIsFullWidth] = useState();

  useEffect(() => {
    toggleFullWidth()
  },[])
  const toggleFullWidth = () => {
    setIsFullWidth(document.body.classList.toggle("layout-fullwidth"));
  };
  return (
    <>
      <nav className="navbar navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-brand">
            <button
              type="button"
              className="btn-toggle-offcanvas"
              onClick={toggleFullWidth}
              style={{ marginRight: "5px" }}
            >
              <i className="fa fa-bars" />
            </button>
            <button
              type="button"
              className="btn-toggle-fullwidth"
              onClick={toggleFullWidth}
              style={{ marginRight: "5px" }}
            >
              <i className="fa fa-bars" />
            </button>
            <Link to="/home">Branding</Link>
          </div>
          <div className="navbar-right">
            <form id="navbar-search" className="navbar-form search-form">
              <input
                defaultValue
                className="form-control"
                placeholder="Search here..."
                type="text"
              />
              <button type="button" className="btn btn-default">
                <i className="icon-magnifier" />
              </button>
            </form>
            <div id="navbar-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a
                    href=""
                    className="dropdown-toggle icon-menu"
                    data-toggle="dropdown"
                  >
                    <i className="fa fa-bell" />
                    <span className="notification-dot" />
                  </a>
                  <ul className="dropdown-menu notifications">
                    <li className="header">
                      <strong>You have 4 new Notifications</strong>
                    </li>
                    <li>
                      <a href="">
                        <div className="media">
                          <div className="media-left">
                            <i className="icon-info text-warning" />
                          </div>
                          <div className="media-body">
                            <p className="text">
                              Campaign <strong>Holiday Sale</strong> is nearly
                              reach budget limit.
                            </p>
                            <span className="timestamp">10:00 AM Today</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <div className="media">
                          <div className="media-left">
                            <i className="icon-like text-success" />
                          </div>
                          <div className="media-body">
                            <p className="text">
                              Your New Campaign <strong>Holiday Sale</strong> is
                              approved.
                            </p>
                            <span className="timestamp">11:30 AM Today</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <div className="media">
                          <div className="media-left">
                            <i className="icon-pie-chart text-info" />
                          </div>
                          <div className="media-body">
                            <p className="text">
                              Website visits from Twitter is 27% higher than
                              last week.
                            </p>
                            <span className="timestamp">04:00 PM Today</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <div className="media">
                          <div className="media-left">
                            <i className="icon-info text-danger" />
                          </div>
                          <div className="media-body">
                            <p className="text">
                              Error on website analytics configurations
                            </p>
                            <span className="timestamp">Yesterday</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="footer">
                      <a href="" className="more">
                        See all notifications
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/" className="icon-menu">
                    <i className="fa fa-power-off" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
