import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Nav2 from "../Nav2/Nav2";
import { toast } from "react-toastify";

import YtIcon from "../Assets/icons8-youtube-100.png";

import healthCare from "../Assets/icons8-health-care-100.png";
import finance from "../Assets/icons8-receive-euro-100.png";
import eCommerce from "../Assets/icons8-buy-100.png";
import education from "../Assets/icons8-education-100.png";
import technology from "../Assets/icons8-software-development-100.png";

import Duration from "../Assets/icons8-timesheet-100.png";
import Price from "../Assets/icons8-price-100.png";
import Ads from "../Assets/icons8-web-advertising-100.png";
import views from "../Assets/icons8-eye-100.png";
import"./youtube.css"

const url = process.env.REACT_APP_API_URL;

const YouTubeConnect = () => {
  const [youtubeData, setYoutubeData] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewCategory, setViewCategory] = useState(false); // New state to control view mode

  const industries = {
    Healthcare: [
      "Pharmaceuticals",
      "Medical Devices",
      "Telemedicine",
      "Biotechnology",
      "Mental Health",
    ],
    Finance: [
      "Banking",
      "Financial Technology (FinTech)",
      "Investment Management",
      "Cryptocurrency",
      "Insurance",
    ],
    "Retail & E-Commerce": [
      "Fashion and Apparel",
      "Consumer Electronics",
      "Groceries",
      "Home Goods",
      "Furniture",
    ],
    Education: [
      "K-12 Education",
      "Higher Education",
      "Online Learning Platforms",
      "Vocational Training",
      "Language Learning",
    ],
    Technology: [
      "Software Development",
      "Cybersecurity",
      "Artificial Intelligence",
      "Cloud Computing",
      "Data Science",
    ],
  };

  const getYoutubeData = () => {
    setLoading(true);
    let query = `?state=${state}&district=${district}`;
    if (selectedIndustry) query += `&industry=${selectedIndustry}`;
    if (selectedCategory) query += `&category=${selectedCategory}`;

    axios
      .get(`${url}getyoutubedata${query}`)
      .then((res) => {
        if (res.data.length === 0) {
          setErr("No Channels found");
          setYoutubeData([]);
        } else {
          setErr(null);
          setYoutubeData(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErr("An error occurred while fetching data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (state && district) {
      getYoutubeData();
    }
  }, [state, district, selectedIndustry, selectedCategory]);

  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
    setViewCategory(true); // Navigate to category view after selecting an industry
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToIndustry = () => {
    setViewCategory(false); // Go back to industry selection
    setSelectedCategory(null); // Reset selected category
  };

  if (loading) return <div className="loader"></div>;

  return (
    <Fragment>
      <Nav2 />
      <h1 className="buyer-title">YouTube Connect</h1>
      <div className="main-container"> 
 {/* Select State and District */}
 {!viewCategory && !selectedCategory && (
        <div className="statesAndDistricts" style={{ textAlign: "center" }}>
          <h2>Select Your Location</h2>
          <label>State</label>
          <select
            className="form-input"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option disabled value="">
              Select State
            </option>
            <option value="Andhrapradesh">Andhra Pradesh</option>
            <option value="Arunachalpradesh">Arunachal Pradesh</option>
          </select>

          <label>District</label>
          <select
            className="form-input"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option disabled value="">
              Select District
            </option>
            {state === "Andhrapradesh" && (
              <>
                <option value="Anantapur">Anantapur</option>
                <option value="Chittoor">Chittoor</option>
              </>
            )}
            {state === "Arunachalpradesh" && (
              <>
                <option value="Anjaw">Anjaw</option>
                <option value="Changlang">Changlang</option>
              </>
            )}
          </select>
          <div className="industryTypes">
          <h2>Select Industry</h2>
          <div className="industryContainer">
            {Object.keys(industries).map((industry) => {
              const industryImages = {
                Healthcare: healthCare,
                Education: education,
                "Retail & E-Commerce": eCommerce,
                Technology: technology,
                Finance: finance,
              };
              return (
                <div
                  key={industry}
                  onClick={() => handleIndustryClick(industry)}
                  className={`industry ${
                    selectedIndustry === industry ? "active" : ""
                  }`}
                >
                  <img
                      src={industryImages[industry]}
                      alt={`${industry} icon`}
                    />
                </div>
              );
            })}
          </div>
        </div>
          
        </div>

        
      )}

   

      </div>
     

      {/* Back Button to go back to Industry Selection */}
      {viewCategory && (
        <button className="back-button" onClick={handleBackToIndustry}>
          Back to Industry
        </button>
      )}

      {/* Select Category */}
      {viewCategory && (
        <div className="subCategories">
          <h2>Select a Category in {selectedIndustry}</h2>
          <div className="subCategoryContainer">
            {industries[selectedIndustry].map((category) => (
              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`category ${
                  selectedCategory === category ? "active" : ""
                }`}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2>Filtered Profiles</h2>
        {err ? (
          <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
            <h2>{err}</h2>
          </div>
        ) : (
          <div className="youtube-container">
          {youtubeData.map((data) => (
            <div className="youtube-card" key={data._id}>
              {/* Channel Thumbnail & Name */}
              <div className="profile">
              <div className="thumbnail">
                <h2>{data.channelname}</h2>
              </div>
                <div>
                  <h3>{data.channelname}</h3>
                  <p>{data.category}</p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="stats">
                <div>
                  <img src={YtIcon} alt="Subscribers" className="icon" />
                  <p>{data.subscribers} Followers</p>
                </div>
                <div>
                  <img
                    src={views}
                    alt="Average Reaches"
                    className="icon"
                  />
                  <p>{data.averageReaches} Reaches</p>
                </div>
                <div>
                  <img
                    src={Duration}
                    alt="Campaign Duration"
                    className="icon"
                  />
                  <p>{data.campaignDuration}</p>
                </div>
                <div>
                  <img
                    src={Ads}
                    alt="Campaigns Per Month"
                    className="icon"
                  />
                  <p>{data.campaignsPerMonth} Campaigns/Month</p>
                </div>
                <div>
                  <img src={Price} alt="Pricing" className="icon" />
                  <p>Rs. {data.pricing}</p>
                </div>
              </div>

              {/* Profile Link
              <div className="profile-link">
                <a
                  href={data.channellink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={LinkIcon} alt="Profile Link" className="icon" />{" "}
                  See Profile
                </a>
              </div> */}
            </div>
          ))}
        </div>
        )}
      </div>
    </Fragment>
  );
};

export default YouTubeConnect;
