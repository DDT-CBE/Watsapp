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
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [step, setStep] = useState(1); // Track the current step
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
      console.log("No token found, redirecting to login...");
      navigate("/login");
      return;
    }

    axios
      .get(`${url}auth/data`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setAuthUser(res.data);
      
        console.log("User data:", res.data);
      })
      .catch((err) => {
        console.log("Error fetching user data: " + err.message);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  };


  const getBuyerData = () => {
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
          console.log(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErr("An error occurred while fetching data.");
        setLoading(false);
      });
  };


  
  const visibelHandeler = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate("/login");
      return;
    }

    if (authUser.credits > 0) {
     
    
      axios
        .post(
          `${url}auth/addnumber`,
          { userId: authUser._id, groupId: id },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((res) => {
          console.log("Successfully added to visibelNumbers:", res.data);
          // Update local state after successful operation
          getUserData();  // Refresh user data to get updated visibelNumbers
        })
        .catch((err) => console.log("Error adding number:", err.message));
    } else {
      toast.error("Your credits are finished. Please recharge.");
    }
  };


  useEffect(() => {
    getUserData();
    if (step >= 2 && step <= 4) {
      getBuyerData();
    }
    setLoading(false);
  }, [step]);

  const handleNext = () => {
    if (step === 1 && (!state || !district)) {
      toast.error("Please select both state and district.");
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  if (loading) return <div className="loader"></div>;

  return (
    <Fragment>
      <Nav2 />
      <h1 className="buyer-title">Watsapp Connect</h1>
      <h2>Your Credits: {authUser?.credits}</h2> {/* Show current credits */}
      {step === 1 && (
        <div className="statesAndDistricts" style={{ textAlign: "center" }}>
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

          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
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
          <div>
            <button onClick={handleBack} className="backbutton">
              Back
            </button>
            <button
              onClick={() =>
                selectedIndustry
                  ? handleNext()
                  : toast.error("Select an industry")
              }
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
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
          <div>
            <button onClick={handleBack}>Back</button>
            <button
              onClick={() =>
                selectedCategory
                  ? handleNext()
                  : toast.error("Select a category")
              }
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step >= 2 && step <= 4 && (
        <div>
          <h2>Filtered Groups</h2>
          {err ? (
            <div
              style={{ textAlign: "center", color: "red", marginTop: "20px" }}
            >
              <h2>{err}</h2>
            </div>
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
                          {!authUser.visibelGroups.includes(data._id) && (
                            <a
                          
                              href={data.groupLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => visibelHandeler(data._id)}
                            >
                              Join Group
                            </a>
                          )}
                               {authUser.visibelGroups.includes(data._id) && (
                           
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
          <button onClick={handleBack}>Back</button>
        </div>
      )}
    </Fragment>
  );
};

export default Watsapp;
