/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../components";
import axios from "axios";

const User = () => {
  const baseUrl = "http://localhost:3001/api/";
  const [userData, setUserData] = useState([]);
  const getUsers = useCallback(async () => {
    try {
      const url = `${baseUrl}users/list`;
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  console.log(userData);
  return (
    <>
      <Layout>
        <div className="row clearfix">
          {userData.length > 0 ? (
            userData?.map((user) => (
              <div className="col-lg-6 col-md-12" key={user?.users_serial_number}>
                <div className="card w_profile">
                  <div className="body">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="profile-image float-md-right">
                          {" "}
                          <img src="assets/images/user.png" alt="" />{" "}
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8 col-12">
                        <h4 className="m-t-0 mb-0">
                          <strong>{user?.first_name}</strong> {user?.last_name}
                        </h4>
                        <span className="job_post">{user?.email_id}</span>
                        <p>
                          Contact Number : {user?.contact_number}
                        </p>
                        <div className="row">
                          <div className="col-4">
                            <h5>65</h5>
                            <small>Total Assignments </small>
                          </div>
                          <div className="col-4">
                            <h5>12</h5>
                            <small>Assignments Done</small>
                          </div>
                          <div className="col-4">
                            <h5>53</h5>
                            <small>Assignments Pending</small>
                          </div>
                        </div>
                        <div className="m-t-15">
                          <button className="btn btn-primary">
                            See Deatils
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No user Data Is Available</p>
          )}
        </div>
      </Layout>
    </>
  );
};

export { User };
