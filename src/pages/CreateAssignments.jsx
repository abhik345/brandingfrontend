import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAssignments = () => {
  const navigate = useNavigate();
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    assignment_type_id: 0,
    category_id: 0,
    subcategory_id: 0,
    install_date: "",
    created_by: "Admin",
    status: false,
    remarks: "",
    location_id: 0,
    area_id: 0,
    banner_type_id: 0,
    banner_image: [],
  });
  const [locationData, setLocationData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [assignTypeData, setAssignTypeData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubcategoryData] = useState([]);
  const [bannerTypeData, setBannerTypeData] = useState([]);
  const baseUrl = "http://localhost:3001/api/";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 10 * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeInBytes) {
        console.error("Image size exceeds the limit.");
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Data = event.target.result;
          setAssignmentData({
            ...assignmentData,
            banner_image: [base64Data],
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({
      ...assignmentData,
      [name]: value,
    });
  };

  const getLocation = useCallback(async () => {
    try {
      const url = `${baseUrl}location/get`;
      const response = await axios.get(url);
      setLocationData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAssignmentType = useCallback(async () => {
    try {
      const url = `${baseUrl}assignment-type/get`;
      const response = await axios.get(url);
      setAssignTypeData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getArea = useCallback(async () => {
    try {
      const url = `${baseUrl}area/get-by-location/${assignmentData?.location_id}`;
      const response = await axios.get(url);
      setAreaData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, [assignmentData]);

  const getCategory = useCallback(async () => {
    try {
      const url = `${baseUrl}categories/list`;
      const response = await axios.get(url);
      setCategoryData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getSubCategory = useCallback(async () => {
    try {
      const url = `${baseUrl}subcategories/get/${assignmentData?.category_id}`;
      const response = await axios.get(url);
      setSubcategoryData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, [assignmentData]);
  const getBannerType = useCallback(async () => {
    try {
      const url = `${baseUrl}banner-type/get`;
      const response = await axios.get(url);
      setBannerTypeData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getLocation();
    getAssignmentType();
    getArea();
    getCategory();
    getSubCategory();
    getBannerType();
  }, [
    getLocation,
    getAssignmentType,
    getArea,
    getCategory,
    getSubCategory,
    getBannerType,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}assignment/create`;
      const response = await axios.post(url, assignmentData);
      navigate("/all-assignment");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <div className="row clearfix">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h2>Create Assignment</h2>
              </div>
              <div className="body">
                <form id="basic-form" noValidate onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={assignmentData?.title}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="card" style={{ border: "none" }}>
                        <label>Assignemnt Type</label>
                        <div className="c_multiselect">
                          <select
                            id="single-selection"
                            name="assignment_type_id"
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
                            onChange={handleChange}
                            value={assignmentData?.assignment_type_id}
                          >
                            <option value="0">Select an Assignment Type</option>
                            {assignTypeData.map((asstyp) => (
                              <option
                                key={asstyp.assignment_type_id}
                                value={asstyp.assignment_type_id}
                              >
                                {asstyp.assignment_type_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="card" style={{ border: "none" }}>
                        <label>Location</label>
                        <div className="c_multiselect">
                          <select
                            id="single-selection"
                            name="location_id"
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
                            onChange={handleChange}
                            value={assignmentData?.location_id}
                          >
                            <option value={0}>Select an Location</option>
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
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="card" style={{ border: "none" }}>
                        <label>Area</label>
                        <div className="c_multiselect">
                          <select
                            id="single-selection"
                            name="area_id"
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
                            onChange={handleChange}
                            value={assignmentData?.area_id}
                          >
                            <option value="0">Select an Area</option>
                            {areaData.map((area) => (
                              <option key={area.area_id} value={area.area_id}>
                                {area.area_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="card" style={{ border: "none" }}>
                        <label>Category</label>
                        <div className="c_multiselect">
                          <select
                            id="single-selection"
                            name="category_id"
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
                            onChange={handleChange}
                            value={assignmentData?.category_id}
                          >
                            <option value="0">Select an Category</option>
                            {categoryData.map((category) => (
                              <option
                                key={category.category_id}
                                value={category.category_id}
                              >
                                {category.category_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="card" style={{ border: "none" }}>
                        <label>Subcategory</label>
                        <div className="c_multiselect">
                          <select
                            id="single-selection"
                            name="subcategory_id"
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
                            onChange={handleChange}
                            value={assignmentData?.subcategory_id}
                          >
                            <option value="0">Select an Subcategory</option>
                            {subCategoryData.map((subcategory) => (
                              <option
                                key={subcategory.subcategory_id}
                                value={subcategory.subcategory_id}
                              >
                                {subcategory.subcategory_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="card" style={{ border: "none" }}>
                        <label>Banner Type</label>
                        <div className="c_multiselect">
                          <select
                            id="single-selection"
                            name="banner_type_id"
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
                            onChange={handleChange}
                            value={assignmentData?.banner_type_id}
                          >
                            <option value="0">Select a Banner Type</option>
                            {bannerTypeData.map((banner) => (
                              <option
                                key={banner.banner_type_id}
                                value={banner.banner_type_id}
                              >
                                {banner.banner_type_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div>
                        <label>Install Date</label>
                        <div className="input-group mb-3">
                          <input
                            type="date"
                            name="install_date"
                            className="form-control"
                            onChange={handleChange}
                            value={assignmentData?.install_date}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Remarks</label>
                        <textarea
                          className="form-control"
                          name="remarks"
                          rows="5"
                          cols="30"
                          value={assignmentData?.remarks}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="card">
                        <div className="header">
                          <h2>Give an image of the user</h2>
                        </div>
                        <div className="body">
                          <input
                            type="file"
                            id="dropify-event"
                            onChange={(e) => handleFileChange(e)}
                          />
                        </div>
                      </div>
                    </div>
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
      </Layout>
    </>
  );
};

export { CreateAssignments };
