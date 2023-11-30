import React from 'react';
import { Layout } from '../../components';

const CreateSubcategory = () => {
  return (
    <Layout>
      <div className="row clearfix">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h2 style={{ color: '#3498db', marginBottom: '20px' }}>Multiselect</h2>
            </div>
            <div className="body demo-card">
              <div className="row clearfix">
                <div className="col-lg-4 col-md-12">
                  <label style={{ fontSize: '18px', marginBottom: '10px' }}>Single Selection</label>
                  <div className="c_multiselect">
                    <select
                      id="single-selection"
                      name="single_selection"
                      className="multiselect multiselect-custom"
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        backgroundColor: '#fff',
                        color: '#555',
                        border: '1px solid #ddd',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      <option value="cheese">Cheese</option>
                      <option value="tomatoes">Tomatoes</option>
                      <option value="mozarella">Mozzarella</option>
                      <option value="mushrooms">Mushrooms</option>
                      <option value="pepperoni">Pepperoni</option>
                      <option value="onions">Onions</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateSubcategory;
