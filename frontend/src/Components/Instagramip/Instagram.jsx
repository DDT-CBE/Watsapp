import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Nav2 from "../Nav2/Nav2";
import { toast } from "react-toastify";
import "./instagram.css";
import YtIcon from "../Assets/icons8-instagram-100.png";

const url = process.env.REACT_APP_API_URL;

const Instagram = () => {
  const [sellerData, setSellerData] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const fetchSellerData = (filters) => {
    setLoading(true);
    let query = "";

    if (filters.state) query += `?state=${filters.state}`;
    if (filters.district) query += `&district=${filters.district}`;
    if (filters.industry) query += `&industry=${filters.industry}`;
    if (filters.category) query += `&category=${filters.category}`;

    axios
      .get(`${url}getinstagramdata${query}`)
      .then((res) => {
        if (res.data.length === 0) {
          setErr("No Profiles found");
          setSellerData([]);
        } else {
          setErr(null);
          setSellerData(res.data);
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
      fetchSellerData({ state, district });
    }
  }, [state, district]);

  const handleStateChange = (e) => {
    setState(e.target.value);
    setDistrict("");
    setSelectedIndustry(null);
    setSelectedCategory(null);
    setSellerData([]);
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setSelectedIndustry(null);
    setSelectedCategory(null);
    setSellerData([]);
  };

  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
    setSelectedCategory(null);
    fetchSellerData({ state, district, industry });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchSellerData({ state, district, industry: selectedIndustry, category });
  };

  const handleBackToStateDistrict = () => {
    setSelectedIndustry(null);
    setSelectedCategory(null);
  };

  const handleBackToLocation = () => {
    setState("");
    setDistrict("");
    setSelectedIndustry(null);
    setSelectedCategory(null);
    setSellerData([]);
  };

  if (loading) return <div className="loader"></div>;

  return (
    <Fragment>
      <Nav2 />
      <h1 className="buyer-title">Instagram Connect</h1>
      {!selectedIndustry && (
        <div className="statesAndDistricts" style={{ textAlign: "center" }}>
          <h2>Select Your Location</h2>
          <label>State</label>
          <select
            className="sellerform-input"
            value={state}
            onChange={handleStateChange}
          >
            <option disabled value="">
              Select State
            </option>
            <option value="Andhrapradesh">Andhra Pradesh</option>
            <option value="Arunachalpradesh">Arunachal Pradesh</option>
          </select>

          <>
            <label>District</label>
            <select
              className="sellerform-input"
              value={district}
              onChange={handleDistrictChange}
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
          </>
        </div>
      )}

      {!selectedIndustry && (
        <div className="industryTypes">
          <h2>Select Industry</h2>
          <div className="industryContainer">
            {Object.keys(industries).map((industry) => (
              <div
                key={industry}
                onClick={() => handleIndustryClick(industry)}
                className={`industry ${
                  selectedIndustry === industry ? "active" : ""
                }`}
              >
                {industry}
              </div>
            ))}
          </div>
          <button onClick={handleBackToLocation}>Back to Location</button>
        </div>
      )}

      {selectedIndustry && (
        <div className="subCategories">
          <h2>Select a Category in {selectedIndustry}</h2>
          <div className="subCategoryContainer">
            {industries[selectedIndustry]?.map((category) => (
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
          <button onClick={handleBackToStateDistrict}>
            Back to Industries
          </button>
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
            {sellerData.map((data) => (
              <div className="youtube-card" key={data._id}>
                <div className="thumbnail">
                  <h2>{data.channelname}</h2>
                </div>
                <table className="details-tables">
                  <tbody>
                    <tr>
                      <th>
                        <img className="yticon" src={YtIcon} alt="" />
                      </th>
                      <td>{data.subscribers} Followers</td>
                    </tr>
                    <tr>
                      <th>Average Reaches</th>
                      <td>{data.averageReaches}</td>
                    </tr>
                    <tr>
                      <th>Campaign Duration</th>
                      <td>{data.campaignDuration}</td>
                    </tr>
                    <tr>
                      <th>Campaigns/Month</th>
                      <td>{data.campaignsPerMonth}</td>
                    </tr>
                    <tr>
                      <th>Pricing</th>
                      <td>Rs.{data.pricing}</td>
                    </tr>
                    <tr>
                      <th>Profile Link</th>
                      <td>
                        <a
                          href={data.channellink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          See Profile
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Instagram;
