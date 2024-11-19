import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./buyerpage.css";
import Nav2 from "../Nav2/Nav2";
import IndustryCategories from "../industryCategory/industryCategory"; // Import the new component
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;


const Watsapp = () => {
  const [buyerdata, setBuyerData] = useState([]);
  const [searchparams] = useSearchParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);


  const location = useLocation();

  const getbuyerdata = (industry = "", category = "") => {
  
    axios
      .get(`${url}getwatsappgroup?` + searchparams.toString())
      .then((res) => {
        if (res.data.length === 0) {
          setErr("No Groups found");
        } else {
          setErr(null);
          setBuyerData(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.response?.data?.message || "An error occurred";
        setErr(errorMessage);
        setLoading(false);
      });
  };

  useEffect(() => {
    getbuyerdata();
  }, [searchparams]);


  if (loading) {
    return <div className="loader"></div>;
  }

  const isWatsappGroup = location.pathname.includes("/watsappgroup");

  return (
    <Fragment>
      <Nav2 />
      <h1 className="buyer-title">Watsapp Connect</h1>
      {isWatsappGroup && (
        <IndustryCategories  />
      )}

      {err ? (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          <h2>{err}</h2>
        </div>
      ) : (
        <div className="buyer-container">
          {buyerdata.map((data) => (
            <div className="buyer-card" key={data._id}>
              <table className="details-tables">
                <tbody>
                  <tr>
                    <th>Industry</th>
                    <td>{data.industry}</td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{data.category}</td>
                  </tr>
                  <tr>
                    <th>Group ID</th>
                    <td>{data._id}</td>
                  </tr>
                  <tr>
                    <th>Group Name</th>
                    <td>{data.groupName}</td>
                  </tr>
                  <tr>
                    <th>Total Members</th>
                    <td>{data.groupMembers}</td>
                  </tr>
                  <tr>
                    <th>Join Status</th>
                    <td>{data.joinStatus ? "Joined" : "Not Joined"}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{data.groupDescription}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>{data.state}</td>
                  </tr>
                  <tr>
                    <th>District</th>
                    <td>{data.district}</td>
                  </tr>
                  <tr>
                    <th>Group Link</th>
                    <td>
                      <a href={data.groupLink} target="_blank" rel="noopener noreferrer">
                        Join Group
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Watsapp;
