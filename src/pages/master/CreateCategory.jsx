import React, { useState, useEffect } from "react";
import { Layout } from "../../components";
import axios from "axios";

const CreateCategory = () => {
  const [category, setCategory] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [updatedCategory, setUpdatedCategory] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [modalAction, setModalAction] = useState("update"); 
  const baseUrl = "http://localhost:3001/api/";

  async function fetchCategory() {
    try {
      const url = `${baseUrl}categories/list`;
      const response = await axios.get(url);
      setCategoryData(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}categories/create`;
      const data = {
        category_name : category
      }
      const response = await axios.post(url,data);
      setCategory("");
      fetchCategory();
      return response.data;
    } catch (error) {
      console.log(error);
    }
    
  };

  const updateClick = (id) => {
    console.log(id);
    setSelectedCategoryId(id);
    setModalAction("update");
  };

  const deleteClick = (id) => {
    console.log(id);
    setSelectedCategoryId(id);
    setModalAction("delete");
  };

  const handleModalAction = async () => {
    if (modalAction === "update") {
      await updateCategory();
    } else if (modalAction === "delete") {
      await deleteCategory();
    }
  };

  const updateCategory = async () => {
    try {
      if (!selectedCategoryId || !updatedCategory) {
        console.error("Invalid input for updateCategory");
        return;
      }

      const url = `${baseUrl}categories/update/${selectedCategoryId}`;
      const data = {
        category_name: updatedCategory,
      };
      const response = await axios.patch(url, data);
      console.log(response.data);
      document.getElementById("defaultModal").click();
      setUpdatedCategory("");
      fetchCategory();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async () => {
    try {
      if (!selectedCategoryId) {
        console.error("Invalid ID Not Found");
        return;
      }

      console.log(selectedCategoryId)
      const url = `${baseUrl}categories/delete/${selectedCategoryId}`;
      // console.log(url)
      const response = await axios.delete(url);
      console.log(response.data);
      document.getElementById("defaultModal").click();
      fetchCategory();
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
                <h2>Create Category</h2>
              </div>
              <div className="body">
                <form id="basic-form" onSubmit={(e) => handleSubmitCategory(e)}>
                  <div className="form-group">
                    <label>Text Input</label>
                    <input
                      type="text"
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
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
            <h2>Category List</h2>
          </div>
          <div className="body">
            <div className="table-responsive">
              <table className="table table-hover mb-0 c_list">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((categoryItem) => (
                    <tr key={categoryItem.category_id}>
                      <td>
                        <p className="c_name">{categoryItem.category_name}</p>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#defaultModal"
                          onClick={() => updateClick(categoryItem.category_id)}
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
                          onClick={() => deleteClick(categoryItem.category_id)}
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
                {modalAction === "update" ? "Update Category" : "Delete Category"}
              </h4>
            </div>
            <div className="modal-body">
              {modalAction === "update" ? (
                <>
                  <label>Category Name Write Here</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updatedCategory}
                    onChange={(e) => setUpdatedCategory(e.target.value)}
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
                className={modalAction === "update" ? "btn btn-success" : "btn btn-danger"}
                onClick={handleModalAction}
                required
              >
                {modalAction === "update" ? "SAVE CHANGES" : "DELETE"}
              </button>
              <button
                type="button"
                className="btn btn-dark"
                data-dismiss="modal"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CreateCategory };
