import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import axios from "axios";

const CreateLocation = () => {
  const [location, setLocation] = useState();
  const [locationData, setLocationData] = useState();
  const [updatedLocation, setUpdatedLocation] = useState();
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [modalAction, setModalAction] = useState("update");
  const baseUrl = "http://localhost:3001/api/";
  const handleSubmitLocation = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}location/create`;
      const data = {
        location_name: location,
      };
      const response = await axios.post(url, data);
      setLocation("");
      fetchLocation();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchLocation() {
    try {
      const url = `${baseUrl}location/get`;
      const response = await axios.get(url);
      // console.log(response.data.data);
      setLocationData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  const updateClick = (id) => {
    console.log(id);
    setSelectedLocationId(id);
    setModalAction("update");
  };
  const deleteClick = (id) => {
    console.log(id);
    setSelectedLocationId(id);
    setModalAction("delete");
  };

  const handleModalAction = async () => {
    if (modalAction === "update") {
      await updateLocation();
    } else if (modalAction === "delete") {
      await deleteLocation();
    }
  };
  const updateLocation = async () => {
    try {
      if (!selectedLocationId) {
        console.log("Invalid input for UpdateLocation");
        return;
      }
      const url = `${baseUrl}location/update/${selectedLocationId}`;
      const data = {
        location_name: updatedLocation,
      };
      const response = await axios.patch(url, data);
      console.log(response.data);
      document.getElementById("defaultModal").click();
      setUpdatedLocation("");
      fetchLocation();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLocation = async () => {
    try {
      if (!selectedLocationId) {
        console.log("Invalid Id Not Found");
      }
      const url = `${baseUrl}location/delete/${selectedLocationId}`;
      const response = await axios.delete(url);
      document.getElementById("defaultModal").click();
      fetchLocation();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  return (
    <>
      <Layout>
        <div className="row clearfix">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h2>Create location</h2>
              </div>
              <div className="body">
                <form id="basic-form" onSubmit={(e) => handleSubmitLocation(e)}>
                  <div className="form-group">
                    <label>Enter Location Here</label>
                    <input
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="header">
            <h2>Location List</h2>
          </div>
          <div className="body">
            <div className="table-responsive">
              <table className="table table-hover mb-0 c_list">
                <thead>
                  <tr>
                    <th>Location Name</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {locationData &&
                    locationData?.map((locationItem) => (
                      <tr key={locationItem?.location_id}>
                        <td>
                          <p className="c_name">
                            {locationItem?.location_name}
                          </p>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-success "
                            data-toggle="modal"
                            data-target="#defaultModal"
                            onClick={() =>
                              updateClick(locationItem?.location_id)
                            }
                          >
                            <i className="fa fa-check-circle"></i> <span>Edit</span>
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-toggle="modal"
                            data-target="#defaultModal"
                            onClick={() =>
                              deleteClick(locationItem?.location_id)
                            }
                          >
                            <i className="fa fa-trash-o"></i> <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>

      {/* Modal */}

      <div className="modal fade" id="defaultModal" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="title" id="defaultModalLabel">
                {modalAction === "update"
                  ? "Update Location"
                  : "Delete Location"}
              </h4>
            </div>
            <div className="modal-body">
              {modalAction === "update" ? (
                <>
                  <label>Category Name Write Here</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updatedLocation}
                    onChange={(e) => setUpdatedLocation(e.target.value)}
                    required
                  />
                </>
              ) : (
                <p>Are you sure you want to delete this location?</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className={
                  modalAction === "update"
                    ? "btn btn-success"
                    : "btn btn-danger"
                }
                onClick={handleModalAction}
                required
              >
                {modalAction === "update" ? "SAVE CHANGES" : "DELETE"}
              </button>
              <button type="button" className="btn btn-dark" data-dismiss="modal">
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLocation;
