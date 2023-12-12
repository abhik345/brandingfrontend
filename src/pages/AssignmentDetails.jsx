/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import { Layout, Loader } from "../components";
import { useParams } from "react-router-dom";
import axios from "axios";

const AssignmentDetails = () => {
  const { id } = useParams();

  const [assignmentDetails, setAssignmentDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [vendorDetails, setVendorDetails] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const getAssignmentDetail = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${baseUrl}assignment/list/${id}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignmentDetails(response.data.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id, token]);

  const getVendors = useCallback(async () => {
    try {
      const url = `${baseUrl}vendors/list`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVendorList(response.data.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [token]);
  console.log(assignmentDetails)

  

  const handleVendorId = (e) => {
    setSelectedVendorId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${baseUrl}assign/assignVendor`;
      const data = {
        assignment_id: assignmentDetails?.assignment_id,
        vendor_id: selectedVendorId,
      };
      const response = await axios.post(url, data);
      getAssignmentDetail();
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // const getVendorDetails = useCallback(async () => {
  //   console.log(ass)
  //   try {
  //     const url = `${baseUrl}vendors/list/${assignmentDetails?.assigned_vendor_id}`;
  //     const response = await axios.get(url);
  //     setVendorDetails(response.data.data);
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }, [assignmentDetails]);

  useEffect(() => {
    getAssignmentDetail();
    getVendors();
    // getVendorDetails();
  }, [getAssignmentDetail, getVendors,]);
  
  

  return (
    <>
      <Layout>
        {loading && <Loader />}
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
                <h3>{assignmentDetails?.title}</h3>
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
        {assignmentDetails?.is_assigned === 0 ? (
          <div>
            <form className="row clearfix" onSubmit={(e) => handleSubmit(e)}>
              <div className="col-lg-6 col-md-12">
                <div className="card" style={{ border: "none" }}>
                  <label style={{ fontSize: "18px", marginBottom: "10px" }}>
                    Vendor Selection
                  </label>
                  <div className="c_multiselect">
                    <select
                      id="single-selection"
                      name="vendor_id"
                      className="multiselect multiselect-custom"
                      style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                        color: "#555",
                        border: "1px solid #ddd",
                        cursor: "pointer",
                        outline: "none",
                      }}
                      onChange={handleVendorId}
                      value={selectedVendorId}
                    >
                      <option value="0">Select a Vendor</option>
                      {vendorList.map((vendor) => (
                        <option key={vendor.vendor_id} value={vendor.vendor_id}>
                          {vendor.first_name} {vendor.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 col-md-12"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button type="submit" className="btn btn-primary">
                  Assign To Vendor
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="row clearfix">
              <div className="col-lg-6">
                <div className="card">
                  <div className="body w_user">
                    <img
                      className="rounded-circle"
                      src="assets/images/sm/avatar4.jpg"
                      alt=""
                    />
                    <div className="wid-u-info">
                      <h5>Richard Foos</h5>
                      <p className="text-muted mb-0">
                        123 6th St. Melbourne, <br />
                        FL 32904
                      </p>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-4">
                        <h5 className="mb-0">2</h5>
                        <small>Completed</small>
                      </div>
                      <div className="col-4">
                        <h5 className="mb-0">3</h5>
                        <small>assigned</small>
                      </div>
                      <div className="col-4">
                        <h5 className="mb-0">1</h5>
                        <small>Pending</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export { AssignmentDetails };
