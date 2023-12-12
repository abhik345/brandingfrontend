import React, { useState } from 'react'
import { Layout,Loader } from '../components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateVendor = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    first_name :"",
    last_name : "",
    contact_number : "",
    address :"",
    email_id : "",
    user_type_id : null
  })
  const [reenterPhoneNumber, setReenterPhoneNumber] = useState("");
  const handleReenterPhoneChange = (e) => {
    setReenterPhoneNumber(e.target.value);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserTypeChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
  
    setFormData({
      ...formData,
      user_type_id: selectedValue,
    });
  };
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const data = {
        ...formData,
        user_type_id: parseInt(formData.user_type_id, 10),
      };
  
      const url = `${baseUrl}vendors/create`;
      const token = localStorage.getItem("token");
  
      const response = await axios.post(url,data, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      console.log(response.data)
      setLoading(false)
      navigate("/vendors")
      return response.data
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <>
    <Layout>
      {loading && <Loader/>}
    <div className="row clearfix">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h2>Create Vendor</h2>
              </div>
              <div className="body">
                <form id="basic-form" noValidate onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          value={formData?.first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          value={formData?.last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <b>Mobile Phone Number</b>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-mobile-phone" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control mobile-phone-number"
                          placeholder="Ex: +00 (000) 000-00-00"
                          name="contact_number"
                          value={formData.contact_number}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <b>Re-enter Phone Number</b>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-mobile-phone" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control mobile-phone-number"
                          placeholder="Ex: +00 (000) 000-00-00"
                          value={reenterPhoneNumber}
                          onChange={handleReenterPhoneChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <b>Email Address</b>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-envelope-o" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control email"
                          placeholder="Ex: example@example.com"
                          name="email_id"
                          value={formData.email_id}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Address</label>
                        <textarea
                          className="form-control"
                          rows={5}
                          cols={30}
                          required
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group">
                        <label>Id Number</label>
                        <input type="text" className="form-control" name="identification_number"
                          value={formData.identification_number}
                          onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="card" style={{ border: "none" }}>
                        <label>User Type Selection</label>
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
                            value={formData.user_type_id}
                            onChange={(e) => handleUserTypeChange(e)}
                          >
                            <option value={0}>Select a Type</option>
                            <option value={2} disabled>User</option>
                            <option value={3} >Vendor</option>
                          </select>
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
  )
}

export { CreateVendor }