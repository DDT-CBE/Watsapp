import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import Edit from './Editbuyer';
import Search from './Search';
import { useSearchParams } from 'react-router-dom';

const APIURL = process.env.REACT_APP_API_URL;

const Editbuyerdata = () => {
  const [buyerdata, setBuyerData] = useState([]);
    const [searchparams] = useSearchParams();
    const [err, setErr] = useState(null); // To store error messages

  // Fetch buyer data
  const getBuyerData = () => {
    axios.get(`${APIURL}getbuyerdata?` + searchparams.toString())
      .then(res => {
        if (res.data.length === 0) {
          setErr("No user found"); // Set the message if no users are found
        } else {
          setErr(null); // Clear error if data is found
          setBuyerData(res.data);
        }
      })
      .catch(err => setErr(err.response.data.message || "An error occurred"));
  };

  // Delete buyer data
  const deleteHandler = (id) => {
    axios.delete(`${APIURL}removebuyerregister/${id}`)
      .then(result => {
        console.log(result);
        // Remove buyer from state after deletion
        setBuyerData(prevData => prevData.filter(buyer => buyer._id !== id));
      })
      .catch(err => console.log(err));
  };

  // Fetch data on component mount and when searchparams change
  useEffect(() => {
    getBuyerData();
  }, [searchparams]);

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">DealerSpot</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login/seller">Login</a>
              </li>
            </ul>
            <Search />
          </div>
        </div>
      </nav>

      <center><h1>Admin Panel - Editing Page</h1></center>

      <h1 className="buyer-title">Buyers</h1>

      {/* Display error or "No user found" */}
      {err ? (
        <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
          <h2>{err}</h2>
        </div>
      ) : (
        <div className="buyer-container">
          {buyerdata.map((data, index) => (
            <div className="buyer-card" key={index}>
              <div className="buyer-id">ID: {data._id}</div>
              <div className="buyer-name">Name: {data.name}</div>
              <div className="buyer-phone">Phone: {data.numberhide ? "You need to pay" : data.phone}</div>
              <Edit data={data} />
              <button onClick={() => deleteHandler(data._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Editbuyerdata;
