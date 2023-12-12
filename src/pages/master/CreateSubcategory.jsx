import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../components";
import axios from "axios";

const CreateSubcategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [subcategoryData, setSubCategoryData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [catgoryId, setCategoryId] = useState(null);
  const [updatedSubCategory, setUpdatedSubCategory] = useState();
  const [subcategory, setSubcategory] = useState("");
  const [modalAction, setModalAction] = useState("update");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  //gettting the category

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

  // Creating the subcategory

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault(); // preventing from reload

    try {
      const url = `${baseUrl}subcategories/create`;
      const data = {
        category_id: selectedCategoryId,
        subcategory_name: subcategory,
      };
      const response = await axios.post(url, data);
      setSubcategory("");
      setSelectedCategoryId(null);
      getSubcategory();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // get subcategory

  const getSubcategory = useCallback(async () => {
    try {
      const url = `${baseUrl}subcategories/get`;
      const response = await axios.get(url);
      setSubCategoryData(response.data.data);
      getCategory();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, [getCategory]);

  // showing the category and subcategory in page directly without change
  useEffect(() => {
    getCategory();
    getSubcategory();
  }, [getSubcategory, getCategory]);

  // update subcategory
  const updateClick = ({ catId, subId }) => {
    console.log(catId, subId);
    setSelectedSubCategoryId(subId);
    setCategoryId(catId);
    setModalAction("update");
  };

  const updateSubCategory = async () => {
    try {
      if (!selectedSubCategoryId) {
        alert("invalid Input for updateSubcategory");
        return;
      }
      const url = `${baseUrl}subcategories/update/${selectedSubCategoryId}`;
      const data = {
        subcategory_name: updatedSubCategory,
        category_id: catgoryId,
      };
      const response = await axios.patch(url, data);
      document.getElementById("defaultModal").click();
      setUpdatedSubCategory("");
      getSubcategory();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // delete subcategory

  const deleteClick = (id) => {
    console.log(id);
    setSelectedSubCategoryId(id);
    setModalAction("delete");
  };

  const deleteSubCategory = async () => {
    try {
      if (!selectedSubCategoryId) {
        console.error("Invalid Id not found");
        return;
      }
      const url = `${baseUrl}subcategories/delete/${selectedSubCategoryId}`;
      const response = await axios.delete(url);
      console.log(response.data);
      document.getElementById("defaultModal").click();
      getSubcategory();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //modal Change

  const handleModalAction = async () => {
    if (modalAction === "update") {
      await updateSubCategory();
    } else if (modalAction === "delete") {
      await deleteSubCategory();
    }
  };

  return (
    <>
      <Layout>
        <div className="row clearfix">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h2 style={{ color: "#3498db", marginBottom: "20px" }}>
                  Sub Category
                </h2>
              </div>
              <div className="body demo-card">
                <div
                  className="row clearfix"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="col-lg-4 col-md-12">
                    <div className="card" style={{ border: "none" }}>
                      <label style={{ fontSize: "18px", marginBottom: "10px" }}>
                        Category Selection
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
                          onChange={handleCategoryChange}
                          value={selectedCategoryId}
                        >
                          <option value="0">Select a Category</option>
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
                  <div className="col-lg-8 col-md-12">
                    <div className="card">
                      <div className="header">
                        <h2>Create Subcategory</h2>
                      </div>
                      <div className="body">
                        <form
                          id="basic-form"
                          onSubmit={(e) => handleSubmitSubCategory(e)}
                          noValidate
                        >
                          <div className="form-group">
                            <label>Write the Subcategory</label>
                            <input
                              type="text"
                              className="form-control"
                              value={subcategory}
                              onChange={(e) => setSubcategory(e.target.value)}
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
            <h2>Subcategory List</h2>
          </div>
          <div className="body">
            <div className="table-responsive">
              <table className="table table-hover mb-0 c_list">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Subcategory Name</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {subcategoryData.map((subcategoryItem) => (
                    <tr key={subcategoryItem.subcategory_id}>
                      <td>
                        <p className="c_name">
                          {subcategoryItem?.category?.category_name}
                        </p>
                      </td>
                      <td>
                        <p className="c_name">
                          {subcategoryItem.subcategory_name}
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
                              subId: subcategoryItem.subcategory_id,
                              catId: subcategoryItem?.category?.category_id,
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
                            deleteClick(subcategoryItem.subcategory_id)
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
                    value={updatedSubCategory}
                    onChange={(e) => setUpdatedSubCategory(e.target.value)}
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

export default CreateSubcategory;
