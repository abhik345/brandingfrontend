import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../components";
import axios from "axios";

const CreateArea = () => {
  const [locationData, setLocationData] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [ selectedAreaId,setSelectedAreaId] = useState(null);
  const [ locationId,setLocationId] = useState(null)
  const [area, setArea] = useState("");
  const [ updatedArea, setUpdatedArea ] = useState("")
  const [areaData, setAreaData] = useState([]);
  const [modalAction, setModalAction] = useState("update");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // get location

  const getLocation = useCallback(async () => {
    try {
      const url = `${baseUrl}location/get`;
      const response = await axios.get(url);
      console.log(response.data);
      setLocationData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLocationChange = (e) => {
    setSelectedLocationId(e.target.value);
  };

  const handleSubmitArea = async (e) => {
    e.preventDefault();

    try {
      const url = `${baseUrl}area/create`;
      const data = {
        location_id: selectedLocationId,
        area_name: area,
      };
      const response = await axios.post(url, data);
      setArea("");
      setSelectedLocationId(null);
      getArea();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // get area

  const getArea = useCallback(async () => {
    try {
      const url = `${baseUrl}area/get`;
      const response = await axios.get(url);
      setAreaData(response.data.data);
      getLocation();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, [getLocation]);

  useEffect(() => {
    getLocation();
    getArea();
  }, [getLocation, getArea]);

  // update area

  const updateClick = ({locaId,areaId}) => {
    console.log(locaId, areaId);
    setSelectedAreaId(areaId);
    setLocationId(locaId);
  }

  const updateArea = async () => {

    try {
        if(!selectedAreaId){
            alert("Invalid Input for area");
            return;
        }
        const url = `${baseUrl}area/update/${selectedAreaId}`
        const data = {
            location_id : locationId,
            area_name : updatedArea
        }
        const response = await axios.patch(url,data)
        document.getElementById("defaultModal").click();
        setUpdatedArea("");
        getArea();
        return response.data;
    } catch (error) {
        console.log(error)
    }
  }

  //delete area
  const deleteClick = (id) => {
    console.log(id);
    setSelectedAreaId(id);
    setModalAction("delete");
  };

  const deleteArea = async () =>{

    try {
        if(!selectedAreaId){
            alert("Invalid area not found")
            return;
        }
        const url = `${baseUrl}area/delete/${selectedAreaId}`
        const response = await axios.delete(url);
        document.getElementById("defaultModal").click()
        getArea();
        return response.data
    } catch (error) {
        console.log(error)
    }
  }

  const handleModalAction = async () => {
    if (modalAction === "update") {
      await updateArea();
    } else if (modalAction === "delete") {
      await deleteArea();
    }
  };

  return (
    <>
      <Layout>
        <div className="row clearfix">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h2 style={{ color: "#3498db", marginBottom: "20px" }}>Area</h2>
              </div>
              <div className="body demo-card">
                <div
                  className="row clearfix"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="col-lg-4 col-md-12">
                    <div className="card" style={{ border: "none" }}>
                      <label style={{ fontSize: "18px", marginBottom: "10px" }}>
                        Location Selection
                      </label>
                      <div className="c_multiselect">
                        <select
                          id="single-selection"
                          name="single_selection"
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
                          onChange={handleLocationChange}
                          value={selectedLocationId}
                        >
                          <option value="0">Select a Location</option>
                          {locationData.map((location) => (
                            <option
                              key={location.location_id}
                              value={location.location_id}
                            >
                              {location.location_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <div className="card">
                      <div className="header">
                        <h2>Create Area</h2>
                      </div>
                      <div className="body">
                        <form
                          id="basic-form"
                          onSubmit={(e) => handleSubmitArea(e)}
                          noValidate
                        >
                          <div className="form-group">
                            <label>Write the Area</label>
                            <input
                              type="text"
                              className="form-control"
                              value={area}
                              onChange={(e) => setArea(e.target.value)}
                              required
                            />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Create
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="header">
            <h2>Area List</h2>
          </div>
          <div className="body">
            <div className="table-responsive">
              <table className="table table-hover mb-0 c_list">
                <thead>
                  <tr>
                    <th>Location Name</th>
                    <th>Area Name</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {areaData.map((areaItem) => (
                    <tr key={areaItem.area_id}>
                      <td>
                        <p className="c_name">
                          {areaItem?.location?.location_name}
                        </p>
                      </td>
                      <td>
                        <p className="c_name">
                          {areaItem.area_name}
                        </p>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#defaultModal"
                          onClick={() =>
                            updateClick({
                              areaId: areaItem?.area_id,
                              locaId: areaItem?.location?.location_id,
                            })
                          }
                        >
                          <i className="fa fa-check-circle"></i>{" "}
                          <span>Edit</span>
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-toggle="modal"
                          data-target="#defaultModal"
                          onClick={() =>
                            deleteClick(areaItem.area_id)
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
                  ? "Update Category"
                  : "Delete Category"}
              </h4>
            </div>
            <div className="modal-body">
              {modalAction === "update" ? (
                <>
                  <label>Category Name Write Here</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updatedArea}
                    onChange={(e) => setUpdatedArea(e.target.value)}
                    required
                  />
                </>
              ) : (
                <p>Are you sure you want to delete this category?</p>
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

export default CreateArea;
