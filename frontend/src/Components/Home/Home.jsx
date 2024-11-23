import React, { Fragment } from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <div className="homecontainer">
        <h1>
          India's First Business Matchmaking <br /> Service.
        </h1>

        <div className="findbox">
          
          <Link to={"/watsapp"} style={{ textDecoration: "none" }}>
            {" "}
            <div className="button2">Watsapp Connect</div>
          </Link>
          <Link to={"/influencer"} style={{ textDecoration: "none" }}>
            {" "}
            <div className="button2">Influencer Connect</div>
          </Link>
          <Link to={"/sellerpage"} style={{ textDecoration: "none" }}>
            {" "}
            <div className="button2">Business Ads</div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
