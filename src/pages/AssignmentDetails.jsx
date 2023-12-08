import React, { useState, useEffect, useCallback } from "react";
import { Layout } from "../components";
import { useParams } from "react-router-dom";
import axios from "axios";

const AssignmentDetails = () => {
  const { id } = useParams();

  const [assignmentDetails, setAssignmentDetails] = useState([]);
  const baseUrl = "http://localhost:3001/api/";
  const getAssignmentDetail = useCallback(async () => {
    try {
      const url = `${baseUrl}assignment/list/${id}`;
      const token = localStorage.getItem("token");

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignmentDetails(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getAssignmentDetail();
  }, [getAssignmentDetail]);

  console.log(assignmentDetails);
  return (
    <>
      <Layout>
        
      </Layout>
    </>
  );
};

export { AssignmentDetails };
