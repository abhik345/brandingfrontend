/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Layout } from "../components";

const AssignmentListing = () => {
  return (
    <>
      <Layout>
        <div className="row clearfix">
          <div className="col-lg-4 col-md-12">
            <div className="card w_social2 overflowhidden">
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
                    <div>Title</div>
                    <h6>About</h6>
                  </div>
                </div>
                <div className="pw_meta">
                  <div className="row">
                    <div className="col-4">
                      <h5>18K</h5>
                      <small>Followers</small>
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
        </div>
      </Layout>
    </>
  );
};

export { AssignmentListing };
