/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssignmentListing = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [assignmentData, setAssignmentData] = useState([]);

  const navigate = useNavigate();
  const getAssignments = useCallback(async () => {
    try {
      const url = `${baseUrl}assignment/list`;
      const response = await axios.get(url);
      setAssignmentData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, [baseUrl]);
  useEffect(() => {
    getAssignments();
  }, [getAssignments]);
  console.log(assignmentData);

  return (
    <>
      <Layout>
        {/* <div className="row clearfix">
          {assignmentData.length > 0 &&
            assignmentData?.map((assignment) => (
              <div
                className="col-lg-4 col-md-12"
                key={assignment?.assignment_id}
              >
                <div
                  className="card w_social2 overflowhidden"
                  onClick={() =>
                    navigate(`/all-assignment/${assignment?.assignment_id}`)
                  }
                >
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
              </div>
            ))}
        </div> */}
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card">
              <div className="header">
                <h2>Table Filter</h2>
              </div>
              <div className="body">
                <button
                  type="button"
                  className="btn mb-1 btn-simple btn-sm btn-default btn-filter mr-2"
                  data-target="all"
                >
                  All Assignments
                </button>
                <button
                  type="button"
                  className="btn mb-1 btn-simple btn-sm btn-success btn-filter mr-2"
                  data-target="approved"
                >
                  Assigned
                </button>
                <button
                  type="button"
                  className="btn mb-1 btn-simple btn-sm btn-warning btn-filter mr-2"
                  data-target="suspended"
                >
                  Done
                </button>
                {/* <button
                      type="button"
                      className="btn mb-1 btn-simple btn-sm btn-info btn-filter mr-2"
                      data-target="pending"
                    >
                      Pending
                    </button>
                    <button
                      type="button"
                      className="btn mb-1 btn-simple btn-sm btn-danger btn-filter mr-2"
                      data-target="blocked"
                    >
                      Blocked
                    </button> */}
                <div className="table-responsive m-t-20">
                  <table className="table table-filter table-hover mb-0">
                    <tbody>
                      {assignmentData?.map((assignment) => (
                        <tr
                          data-status="approved"
                          key={assignment?.assignment_id}
                        >
                          <td>1</td>
                          <td>
                            <div className="media-object">
                              <img
                                src="assets/images/xs/avatar1.jpg"
                                alt=""
                                width="35px"
                                className="rounded-circle"
                              />
                            </div>
                          </td>
                          <td>{assignment?.title}</td>
                          <td>
                            {assignment?.install_date.substring(
                              0,
                              assignment?.install_date.indexOf("T")
                            )}
                          </td>
                          <td width="250px">
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar l-green"
                                role="progressbar"
                                aria-valuenow={87}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: "87%" }}
                              />
                            </div>
                          </td>
                          <td>
                            <span className="badge badge-success">
                              Assigned
                            </span>
                          </td>
                        </tr>
                      ))}
                      {/* <tr data-status="suspended">
                            <td>2</td>
                            <td>
                              <div className="media-object">
                                <img
                                  src="assets/images/xs/avatar2.jpg"
                                  alt=""
                                  width="35px"
                                  className="rounded-circle"
                                />
                              </div>
                            </td>
                            <td>charlotte</td>
                            <td>a.charlotte@gnail.com</td>
                            <td>
                              <div className="progress progress-xs">
                                <div
                                  className="progress-bar l-amber"
                                  role="progressbar"
                                  aria-valuenow={45}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  style={{ width: "45%" }}
                                />
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-warning">
                                Suspended
                              </span>
                            </td>
                          </tr>
                          <tr data-status="blocked">
                            <td>3</td>
                            <td>
                              <div className="media-object">
                                <img
                                  src="assets/images/xs/avatar3.jpg"
                                  alt=""
                                  width="35px"
                                  className="rounded-circle"
                                />
                              </div>
                            </td>
                            <td>grayson</td>
                            <td>grayson@yahoo.com</td>
                            <td>
                              <div className="progress progress-xs">
                                <div
                                  className="progress-bar l-coral"
                                  role="progressbar"
                                  aria-valuenow={16}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  style={{ width: "16%" }}
                                />
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-danger">
                                Blocked
                              </span>
                            </td>
                          </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export { AssignmentListing };
