import React, { useState } from "react";
import { Link } from "react-router-dom";

const RightNavbar = () => {
  const [open, setOpen] = useState(false);

  const toggleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      {open === false ? (
        <div className="right_icon_bar">
          <ul>
            <li>
              <Link to="/create-category">
                <i className="fa fa-envelope" />
              </Link>
            </li>
            <li>
              <a href="app-chat.html">
                <i className="fa fa-comments" />
              </a>
            </li>
            <li>
              <a href="app-calendar.html">
                <i className="fa fa-calendar" />
              </a>
            </li>
            <li>
              <a href="file-dashboard.html">
                <i className="fa fa-folder" />
              </a>
            </li>
            <li>
              <a href="app-contact.html">
                <i className="fa fa-id-card" />
              </a>
            </li>
            <li>
              <a href="blog-list.html">
                <i className="fa fa-globe" />
              </a>
            </li>
            <li>
              <Link to="">
                <i className="fa fa-plus" />
              </Link>
            </li>
            <li>
              <Link onClick={toggleClick} className="right_icon_btn">
                <i className="fa fa-angle-right" />
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <div className="right_icon_bar">
            <ul>
              <li>
                <Link onClick={toggleClick} className="right_icon_btn">
                  <i className="fa fa-angle-left" />
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export { RightNavbar };
