import React from "react";

const Loader = () => {
  return (
    <>
      <div className="page-loader-wrapper">
        <div className="loader">
          <div className="m-t-30">
            <img
              src="assets/images/logo-icon.svg"
              width={48}
              height={48}
              alt="dashboard"
            />
          </div>
          <p>Please wait...</p>
        </div>
      </div>
    </>
  );
};

export { Loader }
