import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./buyerpage.css";
import Nav2 from "../Nav2/Nav2";
import { toast } from "react-toastify";

import healthCare from "../Assets/icons8-health-care-100.png";
import finance from "../Assets/icons8-receive-euro-100.png";
import eCommerce from "../Assets/icons8-buy-100.png";
import education from "../Assets/icons8-education-100.png";
import technology from "../Assets/icons8-software-development-100.png";
import coins from "../Assets/icons8-coins-100.png";
import Members from "../Assets/icons8-people-100.png";
import about from "../Assets/icons8-about-100.png";
import link from "../Assets/icons8-link-100.png";
const url = process.env.REACT_APP_API_URL;

const Watsapp = () => {
  const [buyerData, setBuyerData] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [authUser, setAuthUser] = useState(null);

  const navigate = useNavigate();

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

  const getUserData = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${url}auth/data`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => setAuthUser(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
        }
      });
  };

  const visibelHandeler = (id) => {
    const token = localStorage.getItem("token");

    // If user is not logged in, redirect to login
    if (!token) {
      toast.error("You need to log in to join a group!");
      navigate("/login");
      return;
    }

    // If user is logged in, proceed to check credits
    if (authUser?.credits > 0) {
      axios
        .post(
          `${url}auth/addnumber`,
          { userId: authUser._id, groupId: id },
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then(() => getUserData())
        .catch((err) => console.log("Error adding number:", err.message));
    } else {
      toast.error("Your credits are finished. Please recharge.");
    }
  };

  const getFilteredData = () => {
    setLoading(true);
    let query = `?state=${state}&district=${district}`;
    if (selectedIndustry) query += `&industry=${selectedIndustry}`;
    if (selectedCategory) query += `&category=${selectedCategory}`;

    // Fetch data without token for all users
    axios
      .get(`${url}getwatsappgroup${query}`)
      .then((res) => {
        if (res.data.length === 0) {
          setErr("No Groups found");
          setBuyerData([]);
        } else {
          setErr(null);
          setBuyerData(res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setErr("An error occurred while fetching data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (state && district) getFilteredData();
  }, [state, district, selectedIndustry, selectedCategory]);

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory("");
    } else if (selectedIndustry) {
      setSelectedIndustry("");
    } else {
      setDistrict("");
    }
  };

  if (loading) return <div className="loader"></div>;

  return (
    <Fragment>
      <Nav2 />
      <h1 className="buyer-title">Watsapp Connect</h1>
      <h1 className="credits-container">
        <img className="credit-coin" src={coins} alt="Coins" />
        <span>{authUser?.credits}</span>
      </h1>

      {selectedIndustry && (
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
      )}

      {!selectedIndustry && (
        <div className="main-container">
          <div className="statesAndDistricts">
            <h2>Select Your Location</h2>
            <label>State</label>
            <select
              className="sellerform-input"
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
              className="sellerform-input"
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
          </div>

          <div className="industryTypes">
            <h2>Select Industry</h2>
            <div className="industryContainer">
              {Object.keys(industries).map((industry) => {
                // Map industry names to their corresponding images
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
                    onClick={() => {
                      if (!state || !district) {
                        toast.error("Please select both state and district");
                      } else {
                        setSelectedIndustry(industry);
                      }
                    }}
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

      {selectedIndustry && (
        <div className="subCategories">
          <h2>Select a Category in {selectedIndustry}</h2>
          <div className="subCategoryContainer">
            {industries[selectedIndustry].map((category) => (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
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
        <h2>Filtered Groups</h2>
        {err ? (
          <div className="error-message">{err}</div>
        ) : (
          <div className="youtube-container">
            {buyerData.map((data) => (
              <div className="youtube-card" key={data._id}>
                <div className="thumbnail">
                  <h2>{data.groupName}</h2>
                </div>

                <div className="stats">
                  <div>
                    <img src={Members} alt="Average Reaches" className="icon" />
                    <p>{data.groupMembers} Members</p>
                  </div>

                  <div>
                    <img src={about} alt="Average Reaches" className="icon" />
                    <p>{data.groupDescription} </p>
                  </div>

                  <div>
                    <img src={link} alt="Average Reaches" className="icon" />
                    <p>
                      {" "}
                      {!authUser ? (
                        <button
                          className="join-button"
                          onClick={() => navigate("/login")}
                        >
                          Log in to Join
                        </button>
                      ) : authUser?.credits === 0 ? (
                        <p>You Need To Pay For Credits</p>
                      ) : !authUser.visibelGroups.includes(data._id) ? (
                        <a
                          href={data.groupLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => visibelHandeler(data._id)}
                        >
                          Join Group
                        </a>
                      ) : (
                        <p>Joined</p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Watsapp;
