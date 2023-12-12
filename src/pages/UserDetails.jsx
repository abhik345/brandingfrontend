import React, { useCallback, useState, useEffect } from "react";
import { Layout } from "../components";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [userDetailsData, setUserDetailsData] = useState([]);
  const getUserDetails = useCallback(async () => {
    const url = `${baseUrl}users/list/${id}`;
    const token = localStorage.getItem("token");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserDetailsData(response.data.data);
    return response.data;
  }, [id,baseUrl]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);
  console.log(userDetailsData)
  return (
    <>
      <Layout></Layout>
    </>
  );
};

export { UserDetails };
