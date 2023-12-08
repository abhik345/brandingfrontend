import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../components";
import { useParams } from "react-router-dom";
import axios from "axios";

const VendorDetails = () => {
  const { id } = useParams();
  const [VendorDeatils, setVendorDetails] = useState([]);
  const baseUrl = "http://localhost:3001/api/";

  const getVendorDetails = useCallback(async () => {
    try {
      const url = `${baseUrl}vendors/list/${id}`;
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVendorDetails(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getVendorDetails();
  }, [getVendorDetails]);

//   console.log(VendorDeatils)
  return (
    <>
      <Layout></Layout>
    </>
  );
};

export { VendorDetails };
