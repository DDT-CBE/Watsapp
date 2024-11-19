
import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import Edit from './Editseller';
import Search from './Search';
import { useSearchParams } from 'react-router-dom';

const APIURL = process.env.REACT_APP_API_URL;


const Editsellerdata = () => {

    const [buyerdata, setBuyerData] = useState([]);
    const [searchparams ] = useSearchParams();
    const [err, setErr] = useState(null); // To store error messages

// Fetch buyer data
const getSellerdata = () => {
  axios.get(`${APIURL}getsellerdata?`+searchparams)
    .then(res => {
      if (res.data.length === 0) {
        setErr("No user found"); // Set the message if no users are found
      }else{
        console.log(res.data);
        setBuyerData(res.data);
      }
    })
    .catch(err => setErr(err.response.data.message || "An error occurred"));
};

// Delete buyer data
const deleteHandler = (id) => {
  axios.delete(`${APIURL}removesellerregister/${id}`)
    .then(result => {
      console.log(result);
      // Remove buyer from state after deletion
      setBuyerData(prevData => prevData.filter(buyer => buyer._id !== id));
    })
    .catch(err => console.log(err));
};

// Only fetch data once on component mount
useEffect(() => {
  getSellerdata();
}, [searchparams]); // Empty dependency array ensures it runs only once



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
                  <a className="nav-link" href="/login/seller"> Login </a>
                  </li>
                  
                   
                
                  {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li> */}
                  
                </ul>
                <Search/>
              </div>
            </div>
          </nav>





    <center><h1>Admin Panel - Editing Page</h1></center> 
   

    <h1 className="buyer-title">Seller</h1>
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
  </Fragment>
);
    
}

export default Editsellerdata