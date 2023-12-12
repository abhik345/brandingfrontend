import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Vendors = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate()
  const [vendorData, setVendorData] = useState([]);

  const getVendors = useCallback(async () => {
    try {
      const url = `${baseUrl}vendors/list`;
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVendorData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, [baseUrl]);

  useEffect(() => {
    getVendors();
  }, [getVendors]);

  // console.log(vendorData);
  return (
    <Layout>
      <div className="row clearfix">
        {vendorData.length > 0 ? (
          vendorData?.map((vendor) => (
            <div className="col-lg-6 col-md-12" key={vendor?.vendor_id}>
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
                        <strong>{vendor?.first_name}</strong>{" "}
                        {vendor?.last_name}
                      </h4>
                      <span className="job_post">{vendor?.email_id}</span>
                      <p>Contact Number : {vendor?.contact_number}</p>
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
                        <button className="btn btn-primary" onClick={() => navigate(`/vendors/${vendor?.vendor_id}`)}>See Deatils</button>
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
  );
};

export { Vendors };
