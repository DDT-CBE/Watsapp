import React, { Fragment, useEffect, useState } from "react";
import Nav2 from "../Nav2/Nav2";
import axios from "axios";
import { message } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./dashboard.css";

const DB_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dealerData, setDealerData] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const isDistrictFranchise = location.pathname.includes("/districtfranchise");
  const isDealers = location.pathname.includes("/dealer");
  const isSubDealers = location.pathname.includes("/subdealer");

  // Fetch user data
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${DB_URL}data`, {
        headers: { Authorization: token },
      });
      setAuthUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      if (error.response?.status === 401) localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  // Fetch dealer data and navigate based on type
  const getDealer = async (dealerId) => {
    try {
      const response = await axios.get(`${DB_URL}auth/hierarchy/${dealerId}`);
      const data = response.data[0];  // Assuming data is an array and you need the first item
  
      // Debugging logs
      console.log("Fetched dealer data:", data);
  
      // Navigate and set data based on the type of dealer
      if (data.type === "Company 2") {
        // Navigate to the District Franchise level
        navigate(`/districtfranchise/${data.parentId || dealerId}`);
        setDealerData(data.DistrictFranchises || []);
      } else if (data.type === "Dealer") {
        // Navigate to the Dealer level within this District Franchise
        navigate(`/dealers/${data.parentId || dealerId}`);
        
        // Check and set nested dealer data
      
          setDealerData(data.DistrictFranchises.dealers);
      
      } else if (data.type === "Sub Dealer") {
        // Navigate to the Sub-Dealer level within this Dealer
        navigate(`/subdealers/${data.parentId || dealerId}`);
        
        // Set data if there are sub-dealers
        if (data.subdealers) {
          setDealerData(data.subdealers);
        } else {
          console.warn("No sub-dealers found for this Dealer");
          setDealerData([]);
        }
      } else {
        console.warn("Unknown dealer type:", data.type);
      }
  
    } catch (error) {
      console.error("Error fetching dealer data:", error.message);
      message.error("Dealer Not Found");
    }
  };
  

  // Fetch user data on initial render
  useEffect(() => {
    getUserData();
  }, []);

  // Fetch dealer data based on user auth_id
  useEffect(() => {
    if (authUser?._id) {
      getDealer(authUser._id);
    }
  }, [authUser?._id]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <Fragment>
      <Nav2 />
      
      {isDistrictFranchise && (
        <div className="dashboard-container">
          <h1 className="dashboard-title">District Franchises Dashboard</h1>
          <p className="dashboard-subtitle">
            Explore your district franchises and access detailed information with a single click.
          </p>
          <ul className="franchise-list">
            {dealerData.map((df, index) => (
              <li
                className="franchise-item"
                key={index}
                onClick={() => getDealer(df.dealers._id)}
              >
                {`District Franchise Name: ${df.name}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isDealers && (
        <div className="dashboard-container">
          <h1 className="dashboard-title">Dealers Dashboard</h1>
          <p className="dashboard-subtitle">
            Explore your Dealers and access detailed information with a single click.
          </p>
          <ul className="franchise-list">
           
              <li
                className="franchise-item"

                onClick={() => getDealer(dealerData.auth_id)}
              >
                {` Dealer Name: ${dealerData.name}`}
              </li>
            
          </ul>
        </div>
      )}

      {isSubDealers && (
        <div className="dashboard-container">
          <h1 className="dashboard-title">Sub-Dealers Dashboard</h1>
          <p className="dashboard-subtitle">
            Explore your Sub-Dealers and access detailed information with a single click.
          </p>
          <ul className="franchise-list">
            {dealerData.map((subdealer, index) => (
              <li className="franchise-item" key={index}>
                {`${index + 1}) Sub Dealer Name: ${subdealer.name}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
