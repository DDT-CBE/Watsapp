import React, { Fragment } from "react";
import "./find.css";
import { Link } from "react-router-dom";

const Findyourmatch = () => {
  return (
    <Fragment>
      <center>
        <h1 className="heading">Find Your Best Business Matchmaking !</h1>
      </center>
    
      <div className="findcontainer">
        <h1 className="title">For Registration & Search</h1>
        <div className="findbox">
      
          <Link to={"/watsapp"} style={{ textDecoration: "none" }}>
            {" "}
            <div className="findbtn">Watsapp Connect</div>
          </Link>
          <Link to={"/influencer"} style={{ textDecoration: "none" }}>
            {" "}
            <div className="findbtn">Influencer Connect</div>
          </Link>
          {/* <Link to={"/sellerpage"} style={{textDecoration:"none"}}> <div className='findbtn' >Business Ads</div></Link>   */}
        </div>
      </div>
    </Fragment>
  );
};

export default Findyourmatch;
