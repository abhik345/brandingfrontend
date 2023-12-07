/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../components";
import axios from "axios";

const AssignmentListing = () => {
  const baseUrl = "http://localhost:3001/api/";
  const [assignmentData, setAssignmentData] = useState([]);

  const getAssignments = useCallback(async () => {
    try {
      const url = `${baseUrl}assignment/list`;
      const response = await axios.get(url);
      setAssignmentData(response.data.data)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },[]);
  useEffect(() => {
    getAssignments();
  }, [getAssignments]);
  console.log(assignmentData)
  
  return (
    <>
      <Layout>
        <div className="row clearfix">
          <div className="col-lg-4 col-md-12">
            {assignmentData.length > 0 && assignmentData?.map((assignment)=>(
              <div className="card w_social2 overflowhidden" key={assignment?.assignment_id}>
              <div className="pw_img">
                <img
                  className="img-fluid"
                  src="assets/images/auth_bg.jpg"
                  alt="About the"
                />
              </div>
              <div className="pw_content">
                <div className="pw_header top_counter">
                  <div className="icon bg-transparent">
                    <img
                      src="assets/images/xs/avatar5.jpg"
                      className="rounded-circle"
                      alt=""
                    />
                  </div>
                  <div className="content">
                    <div>{assignment?.title}</div>
                    <h6>About</h6>
                  </div>
                </div>
                <div className="pw_meta">
                  <div className="row">
                    <div className="col-4">
                      <h5>{assignment?.created_by}</h5>
                      <small>Created By</small>
                    </div>
                    <div className="col-4">
                      <h5>532</h5>
                      <small>Following</small>
                    </div>
                    <div className="col-4">
                      <h5>656</h5>
                      <small>Tweets</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
            
          </div>
        </div>
      </Layout>
    </>
  );
};

export { AssignmentListing };
