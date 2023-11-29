import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div id="wrapper" className="theme-cyan">
      <div className="vertical-align-wrap">
        <div className="vertical-align-middle auth-main">
          <div className="auth-box">
            <div className="top">
              <img src="assets/images/logo-white.svg" alt="Iconic" />
            </div>
            <div className="card">
              <div className="header">
                <h3>
                  <span className="clearfix title">
                    <span className="number left">404</span>{" "}
                    <span className="text">
                      Oops! <br />
                      Page Not Found
                    </span>
                  </span>
                </h3>
              </div>
              <div className="body">
                <p>
                  The page you were looking for could not be found, please
                  report this issue.
                </p>
                <div className="margin-top-30">
                  <Link to="/home" className="btn btn-default">
                    <i className="fa fa-arrow-left" /> <span>Go Back</span>
                  </Link>
                  <Link to="/home" className="btn btn-primary">
                    <i className="fa fa-home" /> <span>Home</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageNotFound };
