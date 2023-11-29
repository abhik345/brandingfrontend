import React from "react";
import { Layout } from "../components";

const Home = () => {
  return (
    <>
      <Layout>
        <div className="row clearfix row-deck">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card number-chart">
              <div className="body">
                <span className="text-uppercase">New Sessions</span>
                <h4 className="mb-0 mt-2">
                  22,500 <i className="fa fa-level-up font-12" />
                </h4>
                <small className="text-muted">Analytics for last week</small>
              </div>
              <div
                className="sparkline"
                data-type="line"
                data-spot-radius={0}
                data-offset={90}
                data-width="100%"
                data-height="50px"
                data-line-width={1}
                data-line-color="#39afa6"
                data-fill-color="#73cec7"
              >
                4,1,5,2,7,3,4
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card number-chart">
              <div className="body">
                <span className="text-uppercase">Goal Completions</span>
                <h4 className="mb-0 mt-2">1,12,500</h4>
                <small className="text-muted">Analytics for last week</small>
              </div>
              <div
                className="sparkline"
                data-type="line"
                data-spot-radius={0}
                data-offset={90}
                data-width="100%"
                data-height="50px"
                data-line-width={1}
                data-line-color="#ffa901"
                data-fill-color="#efc26b"
              >
                1,4,2,3,6,2
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card number-chart">
              <div className="body">
                <span className="text-uppercase">TIME ON SITE</span>
                <h4 className="mb-0 mt-2">1,070</h4>
                <small className="text-muted">Analytics for last week</small>
              </div>
              <div
                className="sparkline"
                data-type="line"
                data-spot-radius={0}
                data-offset={90}
                data-width="100%"
                data-height="50px"
                data-line-width={1}
                data-line-color="#38c172"
                data-fill-color="#84d4a6"
              >
                1,4,2,3,1,5
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card number-chart">
              <div className="body">
                <span className="text-uppercase">BOUNCE RATE</span>
                <h4 className="mb-0 mt-2">10K</h4>
                <small className="text-muted">Analytics for last week</small>
              </div>
              <div
                className="sparkline"
                data-type="line"
                data-spot-radius={0}
                data-offset={90}
                data-width="100%"
                data-height="50px"
                data-line-width={1}
                data-line-color="#226fd8"
                data-fill-color="#7ea7de"
              >
                1,3,5,1,4,2
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card top_widget">
              <div className="body">
                <div className="icon">
                  <i className="fa fa-flag" />{" "}
                </div>
                <div className="content">
                  <div className="text mb-2 text-uppercase">Sessions</div>
                  <h4 className="number mb-0">
                    3,251{" "}
                    <span className="font-12 text-muted">
                      <i className="fa fa-level-up" /> 13%
                    </span>
                  </h4>
                  <small className="text-muted">Analytics for last week</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card top_widget">
              <div className="body">
                <div className="icon">
                  <i className="fa fa-users" />{" "}
                </div>
                <div className="content">
                  <div className="text mb-2 text-uppercase">Users</div>
                  <h4 className="number mb-0">
                    25K{" "}
                    <span className="font-12 text-muted">
                      <i className="fa fa-level-down" /> 7%
                    </span>
                  </h4>
                  <small className="text-muted">Analytics for last week</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card top_widget">
              <div className="body">
                <div className="icon">
                  <i className="fa fa-user" />{" "}
                </div>
                <div className="content">
                  <div className="text mb-2 text-uppercase">VISITORS</div>
                  <h4 className="number mb-0">
                    21K{" "}
                    <span className="font-12 text-muted">
                      <i className="fa fa-level-down" /> 4%
                    </span>
                  </h4>
                  <small className="text-muted">Analytics for last week</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card top_widget">
              <div className="body">
                <div className="icon">
                  <i className="fa fa-thumbs-up" />{" "}
                </div>
                <div className="content">
                  <div className="text mb-2 text-uppercase">LIKES</div>
                  <h4 className="number mb-0">
                    53K{" "}
                    <span className="font-12 text-muted">
                      <i className="fa fa-level-up" /> 15%
                    </span>
                  </h4>
                  <small className="text-muted">Analytics for last week</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export { Home };
