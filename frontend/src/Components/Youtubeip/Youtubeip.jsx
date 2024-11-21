import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Nav2 from "../Nav2/Nav2";
import { toast } from "react-toastify";
import "./youtube.css"
import YtIcon from "../Assets/icons8-youtube-100.png"

const url = process.env.REACT_APP_API_URL;

const YouTubeConnect = () => {
  const [youtubeData, setYoutubeData] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [step, setStep] = useState(1); // Track the current step

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
    if (selectedIndustry) query += `&topic=${selectedIndustry}`;
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
    if (step >= 2 && step <= 4) {
      getYoutubeData();
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
      <h1 className="buyer-title">YouTube Connect</h1>

      {step === 1 && (
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
            <button onClick={handleBack}>Back</button>
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
          <h2>Filtered YouTube Channels</h2>
          {err ? (
            <div
              style={{ textAlign: "center", color: "red", marginTop: "20px" }}
            >
              <h2>{err}</h2>
            </div>
          ) : (
            <div className="youtube-container">
              {youtubeData.map((data) => (
               <div className="youtube-card" key={data._id}>
               <div className="thumbnail">
                 <h2>{data.channelname}</h2>
               </div>
               <table className="details-tables">
                 <tbody>
                
                   <tr>
                     <th><img className="yticon" src={YtIcon} alt="" /></th>
                     <td>{data.subscribers} Subscribers</td>
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
                   {/* <tr>
                     <th>Video Link</th>
                     <td>
                       <a href={data.channellink} target="_blank" rel="noopener noreferrer">
                         Watch Video
                       </a>
                     </td>
                   </tr> */}
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

export default YouTubeConnect;
