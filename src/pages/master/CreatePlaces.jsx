import React, {useCallback, useEffect, useState} from "react";
import { Layout } from "../../components";
import axios from "axios";
import MapComponent from "../../components/MapComponent";

const CreatePlaces = () =>{

    const [areaData, setAreaData] = useState([]);
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const getArea = useCallback(() => {
        const url = `${baseUrl}area/get`;

        return axios.get(url)
            .then(response => {
                console.log(response.data);
                setAreaData(response.data.data);
                return response.data.data;
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                throw error;
            });

    }, [baseUrl]);

    useEffect(() => {
        getArea()
            .then(data => {
                console.log("Data fetched:", data);
            })
            .catch(error => {
                console.error("Error in useEffect:", error);
            });
    }, [getArea]);

    return(
        <>
            <Layout>
                <div className="row clearfix">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="header">
                                <h2 style={{color: "#3498db", marginBottom: "20px"}}>Area</h2>
                            </div>
                            <div className="body demo-card">
                                <div
                                    className="row clearfix"
                                    style={{display: "flex", alignItems: "center"}}
                                >
                                    <div className="col-lg-4 col-md-12">
                                        <div className="card" style={{border: "none"}}>
                                            <label style={{fontSize: "18px", marginBottom: "10px"}}>
                                                Area Selection
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
                                                    // onChange={handleLocationChange}
                                                    // value={selectedLocationId}
                                                >
                                                    <option value="0">Select a Area</option>
                                                    {areaData && areaData?.map((area) => (
                                                        <option
                                                            key={area.area_id}
                                                            value={area.area_id}
                                                        >
                                                            {area.area_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className="card">
                                            <div className="header">
                                                <h2>Create Place</h2>
                                            </div>
                                            <div className="body">
                                                <form
                                                    id="basic-form"
                                                    // onSubmit={(e) => handleSubmitArea(e)}
                                                    noValidate
                                                >
                                                    <div className="form-group">
                                                        <label>Write the Place</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            // value={area}
                                                            // onChange={(e) => setArea(e.target.value)}
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
                                    <div className="col-md-12 col-lg-8">
                                        <MapComponent/>
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

export default CreatePlaces;
