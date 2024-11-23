import "../Watsapp/buyerpage.css";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./category.css";
import { toast } from "react-toastify";

const IndustryCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Step states
  const [step, setStep] = useState(1);
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

  // Handle state and district selection
  const handleStateDistrictSubmit = (e) => {
    e.preventDefault();
    if (!state || !district) {
      toast.error("Please select both state and district.");
      return;
    }
    setStep(2); // Move to the industries step
  };

  // Handle industry selection
  const onIndustryClick = (industry) => {
    setSelectedIndustry(industry);
    setStep(3); // Move to the categories step
  };

  // Handle category selection
  const onCategoryClick = (category) => {
    setSelectedCategory(category);
    // Navigate to the profile page with the selected data
    navigate(
      `/profile?state=${state}&district=${district}&industry=${selectedIndustry}&category=${category}`
    );
  };

  return (
    <div className="industry-categories-container">
      {step === 1 && (
        <div className="statesAndDistricts" style={{ textAlign: "center" }}>
          <h1>Select Your Location</h1>
          <form onSubmit={handleStateDistrictSubmit}>
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

            <button className="btn" type="submit">Next</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="industryTypes">
          <h1>Select Industry</h1>
          <div className="industryContainer">
            {Object.keys(industries).map((industry) => (
              <div
                key={industry}
                onClick={() => onIndustryClick(industry)}
                className={`industry ${
                  selectedIndustry === industry ? "active" : ""
                }`}
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && selectedIndustry && (
        <div className="subCategories">
          <h1>Select a Category in {selectedIndustry}</h1>
          <div className="subCategoryContainer">
            {industries[selectedIndustry].map((category) => (
              <div
                key={category}
                onClick={() => onCategoryClick(category)}
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
    </div>
  );
};

export default IndustryCategories;
