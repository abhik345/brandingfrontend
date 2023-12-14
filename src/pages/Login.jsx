import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      if (!userName || !password) {
        alert("Please input User Name and Password");
        return;
      }
      const url = `${baseUrl}commonlogin/login`;
      const data = {
        userName: userName,
        password: password,
      };

      const response = await axios.post(url, data);
      // console.log(response.data);
      if (response.data.success === 1) {
        const { token } = response.data.data;
        if (response.data.data.user) {
          const { users_serial_number, user_type_id } = response.data.data.user;
          localStorage.setItem("user_id", users_serial_number);
          localStorage.setItem(
            "type",
            user_type_id === 1
              ? "Admin"
              : user_type_id === 2
              ? "user"
              : "vendor"
          );
        } else if (response.data.data.vendor) {
          const { vendor_id, user_type_id } = response.data.data.vendor;
          localStorage.setItem("vendor_id", vendor_id);
          localStorage.setItem(
            "type",
            user_type_id === 1
              ? "Admin"
              : user_type_id === 2
              ? "user"
              : "vendor"
          );
        }

        localStorage.setItem("token", token);
      }
      navigate("/home");
      return response.data;
    } catch (error) {
      setPassword("");
      setUsername("");
      console.log(error);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}commonlogin/reset-password`;
      const data = {
        userName: userName,
      };
      const response = await axios.post(url, data);
      setOpen(false)
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleReset = () => {
    setOpen(!open);
  };
  return (
    <>
      <div id="wrapper" className="theme-cyan">
        <div className="vertical-align-wrap">
          <div className="vertical-align-middle auth-main">
            <div className="auth-box">
              <div className="top">
                {/* <img src="assets/images/logo-white.svg" alt="Iconic" /> */}
                <h4
                  className=""
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  BrandMate
                </h4>
              </div>
              <div className="card">
                <div className="header">
                  <p className="lead">Login to your account</p>
                </div>
                <div className="body">
                  {open === false ? (
                    <form
                      className="form-auth-small"
                      onSubmit={(e) => handleSubmitLogin(e)}
                    >
                      <div className="form-group">
                        <label
                          htmlFor="signin-userName"
                          className="control-label sr-only"
                        >
                          User Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="signin-userName"
                          value={userName}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="User Name"
                        />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="signin-password"
                          className="control-label sr-only"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="signin-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group clearfix">
                        <label className="fancy-checkbox element-left">
                          <input type="checkbox" />
                          <span>Remember me</span>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        LOGIN
                      </button>
                      <div className="bottom">
                        <span className="helper-text m-b-10">
                          <i className="fa fa-lock" />
                          <span onClick={handleReset}>Reset password?</span>
                        </span>
                        {/* <span>
                        Don't have an account?{" "}
                        <a href="page-register.html">Register</a>
                      </span> */}
                      </div>
                    </form>
                  ) : (
                    <form
                      className="form-auth-small"
                      onSubmit={(e) => resetPassword(e)}
                    >
                      <div className="form-group">
                        <label
                          htmlFor="signin-userName"
                          className="control-label sr-only"
                        >
                          User Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="signin-userName"
                          value={userName}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="User Name"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Reset Password
                      </button>
                      <div className="bottom" style={{cursor : "pointer"}}>
                        <span>
                          Don't have an account?
                          <span onClick={handleReset}>Back to LOGIN</span>
                        </span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Login };
