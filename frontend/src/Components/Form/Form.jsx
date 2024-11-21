import axios from "axios";
import React, { Fragment, useState } from "react";
import "./form.css"; // Import the CSS file
import Nav2 from "../Nav2/Nav2";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

const Form = () => {
  // State variables to store form input values
  const [channelname, setChannelName] = useState("");
  const [industry, setIndustry] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [channellink, setChannelLink] = useState("");
  const [subscribers, setSubscribers] = useState("");
  const [averageReaches, setAverageReaches] = useState("");
  const [campaignDuration, setCampaignDuration] = useState("");
  const [campaignsPerMonth, setCampaignsPerMonth] = useState("");
  const [pricing, setPricing] = useState("");
  const[type ,setType] =useState("");
  const [numberhide] = useState(true);
  const [approve] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [submit, setSubmit] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  // Handler to capture form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submit
    const formData = {
      channelname,
      industry,
      category,
      state,
      district,
      channellink,
      subscribers,
      campaignDuration,
      campaignsPerMonth,
      type,
      pricing,
      averageReaches,
      numberhide,
      approve,
     
    };

    axios
      .post(`${url}formregister`, formData)
      .then((res) => {
        console.log(res);
        setSubmit(!submit);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      })
      .finally(() => {
        setLoading(false); // Stop loading after request completes
      });
  };

  return (
    <Fragment>
      <div className="form-container">
        <Nav2 />
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Register Information</h2>
          <label>Channel Name</label>
          <input
            type="text"
            value={channelname}
            onChange={(e) => setChannelName(e.target.value)}
          />

          <label>Channel Link</label>
          <input
            type="text"
            value={channellink}
            onChange={(e) => setChannelLink(e.target.value)}
          />

          <label>Number of Subscribers</label>
          <input
            type="number"
            value={subscribers}
            onChange={(e) => setSubscribers(e.target.value)}
          />

          <label>Average Reaches</label>
          <input
            type="number"
            value={averageReaches}
            onChange={(e) => setAverageReaches(e.target.value)}
          />

          <label>Campaign Duration (Video Duration)</label>
          <input
            type="text"
            value={campaignDuration}
            onChange={(e) => setCampaignDuration(e.target.value)}
            placeholder="e.g., 30 seconds"
          />

          <label>Campaigns Per Month</label>
          <input
            type="number"
            value={campaignsPerMonth}
            onChange={(e) => setCampaignsPerMonth(e.target.value)}
          />

          <label>Pricing</label>
          <input
            type="number"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            placeholder="Enter amount in currency"
          />

          <label>Type</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Select Type</option>
            <option value="Instagram">Instagram</option>
            <option value="Watsapp">Watsapp</option>
            <option value="Youtube">Youtube</option>
          </select>

          <label>Industry</label>
          <select
          name="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          <option>Select Industry</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Retail & E-Commerce">Retail & E-Commerce</option>
          <option value="Education">Education</option>
          <option value="Technology">Technology</option>
        </select>

          <label>Category</label>
          <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select Category</option>
          {industry === "Healthcare" && (
            <>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="Medical Devices">Medical Devices</option>
              <option value="Telemedicine">Telemedicine</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Mental Health">Mental Health</option>
            </>
          )}

          {industry === "Finance" && (
            <>
              <option value="Banking">Banking</option>
              <option value="Financial Technology (FinTech)">
                Financial Technology (FinTech)
              </option>
              <option value="Investment Management">
                Investment Management
              </option>
              <option value="Cryptocurrency">Cryptocurrency</option>
              <option value="Insurance">Insurance</option>
            </>
          )}

          {industry === "Retail & E-Commerce" && (
            <>
              <option value="Fashion and Apparel">Fashion and Apparel</option>
              <option value="Consumer Electronics">Consumer Electronics</option>
              <option value="Groceries">Groceries</option>
              <option value="Home Goods">Home Goods</option>
              <option value="Furniture">Furniture</option>
            </>
          )}

          {industry === "Education" && (
            <>
              <option value="K-12 Education">K-12 Education</option>
              <option value="Higher Education">Higher Education</option>
              <option value="Online Learning Platforms">
                Online Learning Platforms
              </option>
              <option value="Vocational Training">Vocational Training</option>
              <option value="Language Learning">Language Learning</option>
            </>
          )}

          {industry === "Technology" && (
            <>
              <option value="Software Development">Software Development</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Data Science">Data Science</option>
            </>
          )}
        </select>

          <label className="sellerform-label">State</label>
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
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachalpradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya_pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamilnadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttarpradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Westbengal">West Bengal</option>
          </select>

          <label className="sellerform-label">District</label>
          <select
            className="sellerform-input"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option>Select District</option>

            {state === "Andhrapradesh" && (
              <>
                <option value="Anantapur">Anantapur</option>
                <option value="Chittoor">Chittoor</option>
                <option value="East Godavari">East Godavari</option>
                <option value="Guntur">Guntur</option>
                <option value="Krishna">Krishna</option>
                <option value="Kurnool">Kurnool</option>
                <option value="Prakasam">Prakasam</option>
                <option value="Sri Potti Sriramulu Nellore">
                  Sri Potti Sriramulu Nellore
                </option>
                <option value="Srikakulam">Srikakulam</option>
                <option value="Visakhapatnam">Visakhapatnam</option>
                <option value="Vizianagaram">Vizianagaram</option>
                <option value="West Godavari">West Godavari</option>
                <option value="YSR Kadapa">YSR Kadapa</option>
              </>
            )}

            {state === "Arunachalpradesh" && (
              <>
                <option value="Anjaw">Anjaw</option>
                <option value="Changlang">Changlang</option>
                <option value="Dibang Valley">Dibang Valley</option>
                <option value="East Kameng">East Kameng</option>
                <option value="East Siang">East Siang</option>
                <option value="Kamle">Kamle</option>
                <option value="Kra Daadi">Kra Daadi</option>
                <option value="Kurung Kumey">Kurung Kumey</option>
                <option value="Lepa Rada">Lepa Rada</option>
                <option value="Lohit">Lohit</option>
                <option value="Longding">Longding</option>
                <option value="Lower Dibang Valley">Lower Dibang Valley</option>
                <option value="Lower Siang">Lower Siang</option>
                <option value="Lower Subansiri">Lower Subansiri</option>
                <option value="Namsai">Namsai</option>
                <option value="Pakke Kessang">Pakke Kessang</option>
                <option value="Papum Pare">Papum Pare</option>
                <option value="Shi Yomi">Shi Yomi</option>
                <option value="Siang">Siang</option>
                <option value="Tawang">Tawang</option>
                <option value="Tirap">Tirap</option>
                <option value="Upper Siang">Upper Siang</option>
                <option value="Upper Subansiri">Upper Subansiri</option>
                <option value="West Kameng">West Kameng</option>
                <option value="West Siang">West Siang</option>
              </>
            )}

            {state === "Assam" && (
              <>
                <option value="Baksa">Baksa</option>
                <option value="Barpeta">Barpeta</option>
                <option value="Biswanath">Biswanath</option>
                <option value="Bongaigaon">Bongaigaon</option>
                <option value="Cachar">Cachar</option>
                <option value="Charaideo">Charaideo</option>
                <option value="Chirang">Chirang</option>
                <option value="Darrang">Darrang</option>
                <option value="Dhemaji">Dhemaji</option>
                <option value="Dhubri">Dhubri</option>
                <option value="Dibrugarh">Dibrugarh</option>
                <option value="Goalpara">Goalpara</option>
                <option value="Golaghat">Golaghat</option>
                <option value="Hailakandi">Hailakandi</option>
                <option value="Hojai">Hojai</option>
                <option value="Jorhat">Jorhat</option>
                <option value="Kamrup">Kamrup</option>
                <option value="Kamrup Metropolitan">Kamrup Metropolitan</option>
                <option value="Karbi Anglong">Karbi Anglong</option>
                <option value="Karimganj">Karimganj</option>
                <option value="Kokrajhar">Kokrajhar</option>
                <option value="Lakhimpur">Lakhimpur</option>
                <option value="Majuli">Majuli</option>
                <option value="Morigaon">Morigaon</option>
                <option value="Nagaon">Nagaon</option>
                <option value="Nalbari">Nalbari</option>
                <option value="Sivasagar">Sivasagar</option>
                <option value="Sonitpur">Sonitpur</option>
                <option value="South Salmara-Mankachar">
                  South Salmara-Mankachar
                </option>
                <option value="Tinsukia">Tinsukia</option>
                <option value="Udalguri">Udalguri</option>
                <option value="West Karbi Anglong">West Karbi Anglong</option>
              </>
            )}

            {state === "Bihar" && (
              <>
                <option value="Araria">Araria</option>
                <option value="Arwal">Arwal</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Banka">Banka</option>
                <option value="Begusarai">Begusarai</option>
                <option value="Bhagalpur">Bhagalpur</option>
                <option value="Bhojpur">Bhojpur</option>
                <option value="Buxar">Buxar</option>
                <option value="Darbhanga">Darbhanga</option>
                <option value="East Champaran">East Champaran</option>
                <option value="Gaya">Gaya</option>
                <option value="Gopalganj">Gopalganj</option>
                <option value="Jamui">Jamui</option>
                <option value="Jehanabad">Jehanabad</option>
                <option value="Kaimur">Kaimur</option>
                <option value="Katihar">Katihar</option>
                <option value="Khagaria">Khagaria</option>
                <option value="Kishanganj">Kishanganj</option>
                <option value="Lakhisarai">Lakhisarai</option>
                <option value="Madhepura">Madhepura</option>
                <option value="Madhubani">Madhubani</option>
                <option value="Munger">Munger</option>
                <option value="Muzaffarpur">Muzaffarpur</option>
                <option value="Nalanda">Nalanda</option>
                <option value="Nawada">Nawada</option>
                <option value="Patna">Patna</option>
                <option value="Purnia">Purnia</option>
                <option value="Rohtas">Rohtas</option>
                <option value="Saharsa">Saharsa</option>
                <option value="Samastipur">Samastipur</option>
                <option value="Saran">Saran</option>
                <option value="Sheikhpura">Sheikhpura</option>
                <option value="Sheohar">Sheohar</option>
                <option value="Sitamarhi">Sitamarhi</option>
                <option value="Siwan">Siwan</option>
                <option value="Supaul">Supaul</option>
                <option value="Vaishali">Vaishali</option>
                <option value="West Champaran">West Champaran</option>
              </>
            )}

            {state === "Chhattisgarh" && (
              <>
                <option value="Balod">Balod</option>
                <option value="Baloda Bazar">Baloda Bazar</option>
                <option value="Balrampur">Balrampur</option>
                <option value="Bastar">Bastar</option>
                <option value="Bemetara">Bemetara</option>
                <option value="Bijapur">Bijapur</option>
                <option value="Bilaspur">Bilaspur</option>
                <option value="Dantewada">Dantewada</option>
                <option value="Dhamtari">Dhamtari</option>
                <option value="Durg">Durg</option>
                <option value="Gariaband">Gariaband</option>
                <option value="Gaurela-Pendra-Marwahi">
                  Gaurela-Pendra-Marwahi
                </option>
                <option value="Janjgir-Champa">Janjgir-Champa</option>
                <option value="Jashpur">Jashpur</option>
                <option value="Kabirdham">Kabirdham</option>
                <option value="Kanker">Kanker</option>
                <option value="Kondagaon">Kondagaon</option>
                <option value="Korba">Korba</option>
                <option value="Koriya">Koriya</option>
                <option value="Mahasamund">Mahasamund</option>
                <option value="Mungeli">Mungeli</option>
                <option value="Narayanpur">Narayanpur</option>
                <option value="Raigarh">Raigarh</option>
                <option value="Raipur">Raipur</option>
                <option value="Rajnandgaon">Rajnandgaon</option>
                <option value="Sukma">Sukma</option>
                <option value="Surajpur">Surajpur</option>
                <option value="Surguja">Surguja</option>
              </>
            )}

            {state === "Goa" && (
              <>
                <option value="North Goa">North Goa</option>
                <option value="South Goa">South Goa</option>
              </>
            )}

            {state === "Gujarat" && (
              <>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Amreli">Amreli</option>
                <option value="Anand">Anand</option>
                <option value="Aravalli">Aravalli</option>
                <option value="Banaskantha">Banaskantha</option>
                <option value="Bharuch">Bharuch</option>
                <option value="Bhavnagar">Bhavnagar</option>
                <option value="Botad">Botad</option>
                <option value="Chhota Udaipur">Chhota Udaipur</option>
                <option value="Dahod">Dahod</option>
                <option value="Dang">Dang</option>
                <option value="Devbhoomi Dwarka">Devbhoomi Dwarka</option>
                <option value="Gandhinagar">Gandhinagar</option>
                <option value="Gir Somnath">Gir Somnath</option>
                <option value="Jamnagar">Jamnagar</option>
                <option value="Junagadh">Junagadh</option>
                <option value="Kheda">Kheda</option>
                <option value="Kutch">Kutch</option>
                <option value="Mahisagar">Mahisagar</option>
                <option value="Mehsana">Mehsana</option>
                <option value="Morbi">Morbi</option>
                <option value="Narmada">Narmada</option>
                <option value="Navsari">Navsari</option>
                <option value="Panchmahal">Panchmahal</option>
                <option value="Patan">Patan</option>
                <option value="Porbandar">Porbandar</option>
                <option value="Rajkot">Rajkot</option>
                <option value="Sabarkantha">Sabarkantha</option>
                <option value="Surat">Surat</option>
                <option value="Surendranagar">Surendranagar</option>
                <option value="Tapi">Tapi</option>
                <option value="Vadodara">Vadodara</option>
                <option value="Valsad">Valsad</option>
              </>
            )}

            {state === "Haryana" && (
              <>
                <option value="Ambala">Ambala</option>
                <option value="Bhiwani">Bhiwani</option>
                <option value="Charkhi Dadri">Charkhi Dadri</option>
                <option value="Faridabad">Faridabad</option>
                <option value="Fatehabad">Fatehabad</option>
                <option value="Gurugram">Gurugram</option>
                <option value="Hisar">Hisar</option>
                <option value="Jhajjar">Jhajjar</option>
                <option value="Jind">Jind</option>
                <option value="Kaithal">Kaithal</option>
                <option value="Karnal">Karnal</option>
                <option value="Kurukshetra">Kurukshetra</option>
                <option value="Mahendragarh">Mahendragarh</option>
                <option value="Nuh">Nuh</option>
                <option value="Palwal">Palwal</option>
                <option value="Panchkula">Panchkula</option>
                <option value="Panipat">Panipat</option>
                <option value="Rewari">Rewari</option>
                <option value="Rohtak">Rohtak</option>
                <option value="Sirsa">Sirsa</option>
                <option value="Sonipat">Sonipat</option>
                <option value="Yamunanagar">Yamunanagar</option>
              </>
            )}

            {state === "Himachalpradesh" && (
              <>
                <option value="Bilaspur">Bilaspur</option>
                <option value="Chamba">Chamba</option>
                <option value="Hamirpur">Hamirpur</option>
                <option value="Kangra">Kangra</option>
                <option value="Kinnaur">Kinnaur</option>
                <option value="Kullu">Kullu</option>
                <option value="Lahaul and Spiti">Lahaul and Spiti</option>
                <option value="Mandi">Mandi</option>
                <option value="Shimla">Shimla</option>
                <option value="Sirmaur">Sirmaur</option>
                <option value="Solan">Solan</option>
                <option value="Una">Una</option>
              </>
            )}

            {state === "Jharkhand" && (
              <>
                <option value="Bokaro">Bokaro</option>
                <option value="Chatra">Chatra</option>
                <option value="Deoghar">Deoghar</option>
                <option value="Dhanbad">Dhanbad</option>
                <option value="Dumka">Dumka</option>
                <option value="East Singhbhum">East Singhbhum</option>
                <option value="Garhwa">Garhwa</option>
                <option value="Giridih">Giridih</option>
                <option value="Godda">Godda</option>
                <option value="Gumla">Gumla</option>
                <option value="Hazaribagh">Hazaribagh</option>
                <option value="Jamtara">Jamtara</option>
                <option value="Khunti">Khunti</option>
                <option value="Koderma">Koderma</option>
                <option value="Latehar">Latehar</option>
                <option value="Lohardaga">Lohardaga</option>
                <option value="Pakur">Pakur</option>
                <option value="Palamu">Palamu</option>
                <option value="Ramgarh">Ramgarh</option>
                <option value="Ranchi">Ranchi</option>
                <option value="Sahebganj">Sahebganj</option>
                <option value="Seraikela Kharsawan">Seraikela Kharsawan</option>
                <option value="Simdega">Simdega</option>
                <option value="West Singhbhum">West Singhbhum</option>
              </>
            )}

            {state === "Karnataka" && (
              <>
                <option value="Bagalkot">Bagalkot</option>
                <option value="Ballari">Ballari</option>
                <option value="Belagavi">Belagavi</option>
                <option value="Bengaluru Rural">Bengaluru Rural</option>
                <option value="Bengaluru Urban">Bengaluru Urban</option>
                <option value="Bidar">Bidar</option>
                <option value="Chamarajanagar">Chamarajanagar</option>
                <option value="Chikkaballapur">Chikkaballapur</option>
                <option value="Chikkamagaluru">Chikkamagaluru</option>
                <option value="Chitradurga">Chitradurga</option>
                <option value="Dakshina Kannada">Dakshina Kannada</option>
                <option value="Davanagere">Davanagere</option>
                <option value="Dharwad">Dharwad</option>
                <option value="Gadag">Gadag</option>
                <option value="Hassan">Hassan</option>
                <option value="Haveri">Haveri</option>
                <option value="Kalaburagi">Kalaburagi</option>
                <option value="Kodagu">Kodagu</option>
                <option value="Kolar">Kolar</option>
                <option value="Koppal">Koppal</option>
                <option value="Mandya">Mandya</option>
                <option value="Mysuru">Mysuru</option>
                <option value="Raichur">Raichur</option>
                <option value="Ramanagara">Ramanagara</option>
                <option value="Shivamogga">Shivamogga</option>
                <option value="Tumakuru">Tumakuru</option>
                <option value="Udupi">Udupi</option>
                <option value="Uttara Kannada">Uttara Kannada</option>
                <option value="Vijayapura">Vijayapura</option>
                <option value="Yadgir">Yadgir</option>
              </>
            )}

            {state === "Kerala" && (
              <>
                <option value="Alappuzha">Alappuzha</option>
                <option value="Ernakulam">Ernakulam</option>
                <option value="Idukki">Idukki</option>
                <option value="Kannur">Kannur</option>
                <option value="Kasaragod">Kasaragod</option>
                <option value="Kollam">Kollam</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Wayanad">Wayanad</option>
              </>
            )}

            {state === "Madhya_pradesh" && (
              <>
                <option value="Agar Malwa">Agar Malwa</option>
                <option value="Alirajpur">Alirajpur</option>
                <option value="Anuppur">Anuppur</option>
                <option value="Ashoknagar">Ashoknagar</option>
                <option value="Balaghat">Balaghat</option>
                <option value="Barwani">Barwani</option>
                <option value="Betul">Betul</option>
                <option value="Bhind">Bhind</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Burhanpur">Burhanpur</option>
                <option value="Chhatarpur">Chhatarpur</option>
                <option value="Chhindwara">Chhindwara</option>
                <option value="Damoh">Damoh</option>
                <option value="Datia">Datia</option>
                <option value="Dewas">Dewas</option>
                <option value="Dhar">Dhar</option>
                <option value="Dindori">Dindori</option>
                <option value="Guna">Guna</option>
                <option value="Gwalior">Gwalior</option>
                <option value="Harda">Harda</option>
                <option value="Hoshangabad">Hoshangabad</option>
                <option value="Indore">Indore</option>
                <option value="Jabalpur">Jabalpur</option>
                <option value="Jhabua">Jhabua</option>
                <option value="Katni">Katni</option>
                <option value="Khandwa">Khandwa</option>
                <option value="Khargone">Khargone</option>
                <option value="Mandla">Mandla</option>
                <option value="Mandsaur">Mandsaur</option>
                <option value="Morena">Morena</option>
                <option value="Narsinghpur">Narsinghpur</option>
                <option value="Neemuch">Neemuch</option>
                <option value="Panna">Panna</option>
                <option value="Raisen">Raisen</option>
                <option value="Rajgarh">Rajgarh</option>
                <option value="Ratlam">Ratlam</option>
                <option value="Rewa">Rewa</option>
                <option value="Sagar">Sagar</option>
                <option value="Satna">Satna</option>
                <option value="Sehore">Sehore</option>
                <option value="Seoni">Seoni</option>
                <option value="Shahdol">Shahdol</option>
                <option value="Shajapur">Shajapur</option>
                <option value="Sheopur">Sheopur</option>
                <option value="Shivpuri">Shivpuri</option>
                <option value="Sidhi">Sidhi</option>
                <option value="Singrauli">Singrauli</option>
                <option value="Tikamgarh">Tikamgarh</option>
                <option value="Ujjain">Ujjain</option>
                <option value="Umaria">Umaria</option>
                <option value="Vidisha">Vidisha</option>
              </>
            )}

            {state === "Maharashtra" && (
              <>
                <option value="Ahmednagar">Ahmednagar</option>
                <option value="Akola">Akola</option>
                <option value="Amravati">Amravati</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Beed">Beed</option>
                <option value="Bhandara">Bhandara</option>
                <option value="Buldhana">Buldhana</option>
                <option value="Chandrapur">Chandrapur</option>
                <option value="Dhule">Dhule</option>
                <option value="Gadchiroli">Gadchiroli</option>
                <option value="Gondia">Gondia</option>
                <option value="Hingoli">Hingoli</option>
                <option value="Jalgaon">Jalgaon</option>
                <option value="Jalna">Jalna</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Latur">Latur</option>
                <option value="Mumbai City">Mumbai City</option>
                <option value="Mumbai Suburban">Mumbai Suburban</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Nanded">Nanded</option>
                <option value="Nandurbar">Nandurbar</option>
                <option value="Nashik">Nashik</option>
                <option value="Osmanabad">Osmanabad</option>
                <option value="Palghar">Palghar</option>
                <option value="Parbhani">Parbhani</option>
                <option value="Pune">Pune</option>
                <option value="Raigad">Raigad</option>
                <option value="Ratnagiri">Ratnagiri</option>
                <option value="Sangli">Sangli</option>
                <option value="Satara">Satara</option>
                <option value="Sindhudurg">Sindhudurg</option>
                <option value="Solapur">Solapur</option>
                <option value="Thane">Thane</option>
                <option value="Wardha">Wardha</option>
                <option value="Washim">Washim</option>
                <option value="Yavatmal">Yavatmal</option>
              </>
            )}

            {state === "Manipur" && (
              <>
                <option value="Bishnupur">Bishnupur</option>
                <option value="Chandel">Chandel</option>
                <option value="Churachandpur">Churachandpur</option>
                <option value="Imphal East">Imphal East</option>
                <option value="Imphal West">Imphal West</option>
                <option value="Jiribam">Jiribam</option>
                <option value="Kakching">Kakching</option>
                <option value="Kamjong">Kamjong</option>
                <option value="Kangpokpi">Kangpokpi</option>
                <option value="Noney">Noney</option>
                <option value="Pherzawl">Pherzawl</option>
                <option value="Senapati">Senapati</option>
                <option value="Tamenglong">Tamenglong</option>
                <option value="Tengnoupal">Tengnoupal</option>
                <option value="Thoubal">Thoubal</option>
                <option value="Ukhrul">Ukhrul</option>
              </>
            )}

            {state === "Meghalaya" && (
              <>
                <option value="East Garo Hills">East Garo Hills</option>
                <option value="East Jaintia Hills">East Jaintia Hills</option>
                <option value="East Khasi Hills">East Khasi Hills</option>
                <option value="North Garo Hills">North Garo Hills</option>
                <option value="Ri Bhoi">Ri Bhoi</option>
                <option value="South Garo Hills">South Garo Hills</option>
                <option value="South West Garo Hills">
                  South West Garo Hills
                </option>
                <option value="South West Khasi Hills">
                  South West Khasi Hills
                </option>
                <option value="West Garo Hills">West Garo Hills</option>
                <option value="West Jaintia Hills">West Jaintia Hills</option>
                <option value="West Khasi Hills">West Khasi Hills</option>
              </>
            )}

            {state === "Mizoram" && (
              <>
                <option value="Aizawl">Aizawl</option>
                <option value="Champhai">Champhai</option>
                <option value="Kolasib">Kolasib</option>
                <option value="Lawngtlai">Lawngtlai</option>
                <option value="Lunglei">Lunglei</option>
                <option value="Mamit">Mamit</option>
                <option value="Saiha">Saiha</option>
                <option value="Serchhip">Serchhip</option>
              </>
            )}

            {state === "Nagaland" && (
              <>
                <option value="Dimapur">Dimapur</option>
                <option value="Kiphire">Kiphire</option>
                <option value="Kohima">Kohima</option>
                <option value="Longleng">Longleng</option>
                <option value="Mokokchung">Mokokchung</option>
                <option value="Mon">Mon</option>
                <option value="Peren">Peren</option>
                <option value="Phek">Phek</option>
                <option value="Tuensang">Tuensang</option>
                <option value="Wokha">Wokha</option>
                <option value="Zunheboto">Zunheboto</option>
              </>
            )}

            {state === "Odisha" && (
              <>
                <option value="Angul">Angul</option>
                <option value="Balangir">Balangir</option>
                <option value="Balasore">Balasore</option>
                <option value="Bargarh">Bargarh</option>
                <option value="Bhadrak">Bhadrak</option>
                <option value="Boudh">Boudh</option>
                <option value="Cuttack">Cuttack</option>
                <option value="Deogarh">Deogarh</option>
                <option value="Dhenkanal">Dhenkanal</option>
                <option value="Gajapati">Gajapati</option>
                <option value="Ganjam">Ganjam</option>
                <option value="Jagatsinghpur">Jagatsinghpur</option>
                <option value="Jajpur">Jajpur</option>
                <option value="Jharsuguda">Jharsuguda</option>
                <option value="Kalahandi">Kalahandi</option>
                <option value="Kandhamal">Kandhamal</option>
                <option value="Kendrapara">Kendrapara</option>
                <option value="Kendujhar">Kendujhar</option>
                <option value="Khordha">Khordha</option>
                <option value="Koraput">Koraput</option>
                <option value="Malkangiri">Malkangiri</option>
                <option value="Mayurbhanj">Mayurbhanj</option>
                <option value="Nabarangpur">Nabarangpur</option>
                <option value="Nayagarh">Nayagarh</option>
                <option value="Nuapada">Nuapada</option>
                <option value="Puri">Puri</option>
                <option value="Rayagada">Rayagada</option>
                <option value="Sambalpur">Sambalpur</option>
                <option value="Subarnapur">Subarnapur</option>
                <option value="Sundargarh">Sundargarh</option>
              </>
            )}

            {state === "Punjab" && (
              <>
                <option value="Amritsar">Amritsar</option>
                <option value="Barnala">Barnala</option>
                <option value="Bathinda">Bathinda</option>
                <option value="Faridkot">Faridkot</option>
                <option value="Fatehgarh Sahib">Fatehgarh Sahib</option>
                <option value="Fazilka">Fazilka</option>
                <option value="Ferozepur">Ferozepur</option>
                <option value="Gurdaspur">Gurdaspur</option>
                <option value="Hoshiarpur">Hoshiarpur</option>
                <option value="Jalandhar">Jalandhar</option>
                <option value="Kapurthala">Kapurthala</option>
                <option value="Ludhiana">Ludhiana</option>
                <option value="Mansa">Mansa</option>
                <option value="Moga">Moga</option>
                <option value="Pathankot">Pathankot</option>
                <option value="Patiala">Patiala</option>
                <option value="Rupnagar">Rupnagar</option>
                <option value="Sangrur">Sangrur</option>
                <option value="SAS Nagar">SAS Nagar</option>
                <option value="Shaheed Bhagat Singh Nagar">
                  Shaheed Bhagat Singh Nagar
                </option>
                <option value="Sri Muktsar Sahib">Sri Muktsar Sahib</option>
                <option value="Tarn Taran">Tarn Taran</option>
              </>
            )}

            {state === "Rajasthan" && (
              <>
                <option value="Ajmer">Ajmer</option>
                <option value="Alwar">Alwar</option>
                <option value="Banswara">Banswara</option>
                <option value="Baran">Baran</option>
                <option value="Barmer">Barmer</option>
                <option value="Bharatpur">Bharatpur</option>
                <option value="Bhilwara">Bhilwara</option>
                <option value="Bikaner">Bikaner</option>
                <option value="Bundi">Bundi</option>
                <option value="Chittorgarh">Chittorgarh</option>
                <option value="Churu">Churu</option>
                <option value="Dausa">Dausa</option>
                <option value="Dholpur">Dholpur</option>
                <option value="Dungarpur">Dungarpur</option>
                <option value="Hanumangarh">Hanumangarh</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Jaisalmer">Jaisalmer</option>
                <option value="Jalore">Jalore</option>
                <option value="Jhalawar">Jhalawar</option>
                <option value="Jhunjhunu">Jhunjhunu</option>
                <option value="Jodhpur">Jodhpur</option>
                <option value="Karauli">Karauli</option>
                <option value="Kota">Kota</option>
                <option value="Nagaur">Nagaur</option>
                <option value="Pali">Pali</option>
                <option value="Pratapgarh">Pratapgarh</option>
                <option value="Rajsamand">Rajsamand</option>
                <option value="Sawai Madhopur">Sawai Madhopur</option>
                <option value="Sikar">Sikar</option>
                <option value="Sirohi">Sirohi</option>
                <option value="Sri Ganganagar">Sri Ganganagar</option>
                <option value="Tonk">Tonk</option>
                <option value="Udaipur">Udaipur</option>
              </>
            )}

            {state === "Sikkim" && (
              <>
                <option value="East Sikkim">East Sikkim</option>
                <option value="North Sikkim">North Sikkim</option>
                <option value="South Sikkim">South Sikkim</option>
                <option value="West Sikkim">West Sikkim</option>
              </>
            )}

            {state === "Tamilnadu" && (
              <>
                <option value="Ariyalur">Ariyalur</option>
                <option value="Chengalpattu">Chengalpattu</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Cuddalore">Cuddalore</option>
                <option value="Dharmapuri">Dharmapuri</option>
                <option value="Dindigul">Dindigul</option>
                <option value="Erode">Erode</option>
                <option value="Kallakurichi">Kallakurichi</option>
                <option value="Kanchipuram">Kanchipuram</option>
                <option value="Kanyakumari">Kanyakumari</option>
                <option value="Karur">Karur</option>
                <option value="Krishnagiri">Krishnagiri</option>
                <option value="Madurai">Madurai</option>
                <option value="Nagapattinam">Nagapattinam</option>
                <option value="Namakkal">Namakkal</option>
                <option value="Nilgiris">Nilgiris</option>
                <option value="Perambalur">Perambalur</option>
                <option value="Pudukkottai">Pudukkottai</option>
                <option value="Ramanathapuram">Ramanathapuram</option>
                <option value="Ranipet">Ranipet</option>
                <option value="Salem">Salem</option>
                <option value="Sivaganga">Sivaganga</option>
                <option value="Tenkasi">Tenkasi</option>
                <option value="Thanjavur">Thanjavur</option>
                <option value="Theni">Theni</option>
                <option value="Thoothukudi">Thoothukudi</option>
                <option value="Tiruchirappalli">Tiruchirappalli</option>
                <option value="Tirunelveli">Tirunelveli</option>
                <option value="Tirupathur">Tirupathur</option>
                <option value="Tiruppur">Tiruppur</option>
                <option value="Tiruvallur">Tiruvallur</option>
                <option value="Tiruvannamalai">Tiruvannamalai</option>
                <option value="Tiruvarur">Tiruvarur</option>
                <option value="Vellore">Vellore</option>
                <option value="Viluppuram">Viluppuram</option>
                <option value="Virudhunagar">Virudhunagar</option>
              </>
            )}

            {state === "Telangana" && (
              <>
                <option value="Adilabad">Adilabad</option>
                <option value="Bhadradri Kothagudem">
                  Bhadradri Kothagudem
                </option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Jagtial">Jagtial</option>
                <option value="Jangaon">Jangaon</option>
                <option value="Jayashankar Bhupalpally">
                  Jayashankar Bhupalpally
                </option>
                <option value="Jogulamba Gadwal">Jogulamba Gadwal</option>
                <option value="Kamareddy">Kamareddy</option>
                <option value="Karimnagar">Karimnagar</option>
                <option value="Khammam">Khammam</option>
                <option value="Komaram Bheem Asifabad">
                  Komaram Bheem Asifabad
                </option>
                <option value="Mahabubabad">Mahabubabad</option>
                <option value="Mahabubnagar">Mahabubnagar</option>
                <option value="Mancherial">Mancherial</option>
                <option value="Medak">Medak</option>
                <option value="Medchal Malkajgiri">Medchal Malkajgiri</option>
                <option value="Mulugu">Mulugu</option>
                <option value="Nagarkurnool">Nagarkurnool</option>
                <option value="Nalgonda">Nalgonda</option>
                <option value="Narayanpet">Narayanpet</option>
                <option value="Nirmal">Nirmal</option>
                <option value="Nizamabad">Nizamabad</option>
                <option value="Peddapalli">Peddapalli</option>
                <option value="Rajanna Sircilla">Rajanna Sircilla</option>
                <option value="Rangareddy">Rangareddy</option>
                <option value="Sangareddy">Sangareddy</option>
                <option value="Siddipet">Siddipet</option>
                <option value="Suryapet">Suryapet</option>
                <option value="Vikarabad">Vikarabad</option>
                <option value="Wanaparthy">Wanaparthy</option>
                <option value="Warangal Rural">Warangal Rural</option>
                <option value="Warangal Urban">Warangal Urban</option>
                <option value="Yadadri Bhuvanagiri">Yadadri Bhuvanagiri</option>
              </>
            )}

            {state === "Tripura" && (
              <>
                <option value="Dhalai">Dhalai</option>
                <option value="Gomati">Gomati</option>
                <option value="Khowai">Khowai</option>
                <option value="North Tripura">North Tripura</option>
                <option value="Sepahijala">Sepahijala</option>
                <option value="South Tripura">South Tripura</option>
                <option value="Unakoti">Unakoti</option>
                <option value="West Tripura">West Tripura</option>
              </>
            )}

            {state === "Uttarpradesh" && (
              <>
                <option value="Agra">Agra</option>
                <option value="Aligarh">Aligarh</option>
                <option value="Ambedkar Nagar">Ambedkar Nagar</option>
                <option value="Amethi">Amethi</option>
                <option value="Amroha">Amroha</option>
                <option value="Auraiya">Auraiya</option>
                <option value="Ayodhya">Ayodhya</option>
                <option value="Azamgarh">Azamgarh</option>
                <option value="Badaun">Badaun</option>
                <option value="Baghpat">Baghpat</option>
                <option value="Bahraich">Bahraich</option>
                <option value="Ballia">Ballia</option>
                <option value="Balrampur">Balrampur</option>
                <option value="Banda">Banda</option>
                <option value="Barabanki">Barabanki</option>
                <option value="Bareilly">Bareilly</option>
                <option value="Basti">Basti</option>
                <option value="Bhadohi">Bhadohi</option>
                <option value="Bijnor">Bijnor</option>
                <option value="Bulandshahr">Bulandshahr</option>
                <option value="Chandauli">Chandauli</option>
                <option value="Chitrakoot">Chitrakoot</option>
                <option value="Deoria">Deoria</option>
                <option value="Etah">Etah</option>
                <option value="Etawah">Etawah</option>
                <option value="Farrukhabad">Farrukhabad</option>
                <option value="Fatehpur">Fatehpur</option>
                <option value="Firozabad">Firozabad</option>
                <option value="Gautam Buddha Nagar">Gautam Buddha Nagar</option>
              </>
            )}

            {state === "Uttarakhand" && (
              <>
                <option value="Almora">Almora</option>
                <option value="Bageshwar">Bageshwar</option>
                <option value="Chamoli">Chamoli</option>
                <option value="Champawat">Champawat</option>
                <option value="Dehradun">Dehradun</option>
                <option value="Haridwar">Haridwar</option>
                <option value="Nainital">Nainital</option>
                <option value="Pauri Garhwal">Pauri Garhwal</option>
                <option value="Pithoragarh">Pithoragarh</option>
                <option value="Rudraprayag">Rudraprayag</option>
                <option value="Tehri Garhwal">Tehri Garhwal</option>
                <option value="Udham Singh Nagar">Udham Singh Nagar</option>
                <option value="Uttarkashi">Uttarkashi</option>
              </>
            )}
            {state === "Westbengal" && (
              <>
                <option value="Alipurduar">Alipurduar</option>
                <option value="Bankura">Bankura</option>
                <option value="Birbhum">Birbhum</option>
                <option value="Burdwan">Burdwan</option>
                <option value="Cooch Behar">Cooch Behar</option>
                <option value="Dakshin Dinajpur">Dakshin Dinajpur</option>
                <option value="Darjeeling">Darjeeling</option>
                <option value="Hooghly">Hooghly</option>
                <option value="Howrah">Howrah</option>
                <option value="Jalpaiguri">Jalpaiguri</option>
                <option value="Jhargram">Jhargram</option>
                <option value="Kalimpong">Kalimpong</option>
                <option value="Koch Bihar">Koch Bihar</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Malda">Malda</option>
                <option value="Murshidabad">Murshidabad</option>
                <option value="Nadia">Nadia</option>
                <option value="North 24 Parganas">North 24 Parganas</option>
                <option value="Purba Bardhaman">Purba Bardhaman</option>
                <option value="Purulia">Purulia</option>
                <option value="South 24 Parganas">South 24 Parganas</option>
                <option value="West Bardhaman">West Bardhaman</option>
              </>
            )}
          </select>

          <button type="submit" disabled={loading || submit}>
            {loading ? "Submitting..." : submit ? "Form Submitted" : "Submit"}
          </button>
          <div className="centered-text">
            {submit ? "Thank you for filling out the form!" : err}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Form;
