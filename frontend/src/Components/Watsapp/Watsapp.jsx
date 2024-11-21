import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./buyerpage.css";
import Nav2 from "../Nav2/Nav2";
import { toast } from "react-toastify";

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

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${url}auth/data`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => setAuthUser(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  };

  const getFilteredData = () => {
    setLoading(true);
    let query = `?state=${state}&district=${district}`;
    if (selectedIndustry) query += `&industry=${selectedIndustry}`;
    if (selectedCategory) query += `&category=${selectedCategory}`;

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

  const visibelHandeler = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

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
      <h2>Your Credits: {authUser?.credits}</h2>
      {selectedIndustry && (
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
      )}

      {!selectedIndustry && (
        <div>
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
              {Object.keys(industries).map((industry) => (
                <div
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`industry ${
                    selectedIndustry === industry ? "active" : ""
                  }`}
                >
                  {industry}
                </div>
              ))}
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
          <div className="buyer-container">
            {buyerData.map((data) => (
              <div className="buyer-card" key={data._id}>
                <table className="details-tables">
                  <tbody>
                    <tr>
                      <th>Group Name</th>
                      <td>{data.groupName}</td>
                    </tr>
                    <tr>
                      <th>Total Members</th>
                      <td>{data.groupMembers}</td>
                    </tr>
                    <tr>
                      <th>Group Description</th>
                      <td>{data.groupDescription}</td>
                    </tr>
                    <tr>
                      <th>District</th>
                      <td>{data.district}</td>
                    </tr>
                    <tr>
                      <th>Group Link</th>
                      <td>
                        {authUser?.credits === 0 ? (
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

export default Watsapp;
