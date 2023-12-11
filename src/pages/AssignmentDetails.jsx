/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import { Layout,Loader } from "../components";
import { useParams } from "react-router-dom";
import axios from "axios";

const AssignmentDetails = () => {
  const { id } = useParams();

  const [assignmentDetails, setAssignmentDetails] = useState([]);
  const [ loading,setLoading] = useState(false)
  const baseUrl = "http://localhost:3001/api/";
  const getAssignmentDetail = useCallback(async () => {
    try {
      setLoading(true)
      const url = `${baseUrl}assignment/list/${id}`;
      const token = localStorage.getItem("token");

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignmentDetails(response.data.data);
      setLoading(false)
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }, [id]);

  useEffect(() => {
    getAssignmentDetail();
  }, [getAssignmentDetail]);

  console.log(assignmentDetails);
  return (
    <>
      <Layout>
        {loading && <Loader/>}
        <div className="row clearfix">
          <div className="col-lg-8 col-md-12 left-box">
            <div className="card single_post">
              <div className="body">
                <div className="img-post">
                  <img
                    className="d-block img-fluid"
                    src="assets/images/blog/blog-page-1.jpg"
                    alt="First slide"
                  />
                </div>
                <h3>
                  {assignmentDetails?.title}
                </h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 right-box">
            <div className="card">
              <div className="body search">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="icon-magnifier" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="header">
                <h2>
                  Email Newsletter{" "}
                  <small>
                    Get our products/news earlier than others, let’s get in
                    touch.
                  </small>
                </h2>
              </div>
              <div className="body widget newsletter">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="icon-paper-plane" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export { AssignmentDetails };
