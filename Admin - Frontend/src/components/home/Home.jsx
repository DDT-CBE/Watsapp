import React from "react";
import "./home.css"; // Import your CSS file

const Home = () => {
  return (
    <div className="home-container">
      
    
      
      
      <a href="/buyer"><div  className="approval-section buyer-approval">Buyer Approval</div></a>
      <a href="/seller"><div className="approval-section seller-approval">  Seller Approval</div></a>
      <a href="/buyeredit"><div className="edit-section buyer-edit">Buyer Edit</div></a>
      <a href="/selleredit"><div className="edit-section seller-edit">Seller Edit</div></a>
    </div>
  );
};

export default Home;
