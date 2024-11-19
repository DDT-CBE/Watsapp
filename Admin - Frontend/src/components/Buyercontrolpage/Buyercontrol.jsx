import axios from 'axios';
import React, { Fragment ,useEffect,useState} from 'react'
import "./buyercontrol.css";
const APIURL = process.env.REACT_APP_API_URL;

const Buyercontrol = () => {

    const [userdata, setUserData] = useState([]);
    const [loading, setLoading] = useState(true); 
    

      // Fetch user data
  const handleFetch = () => {
    axios.get(`${APIURL}getdata`)
      .then(res => {
        console.log(res.data);
        setUserData(res.data);
        setLoading(false); // Set loading false once data is fetched
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  


    // Handle approval of user data
    const approveHandler = (id, currentApproveStatus) => {
        // Toggle the approve status
        const newApproveStatus = !currentApproveStatus;
    
        // Update the user approval status in the backend
        axios.put(`${APIURL}update/${id}`, { approve: newApproveStatus })
          .then(res => {
            console.log(res.data);
    
            // Update the state to reflect the change
            const updatedUsers = userdata.map(user => 
              user._id === id ? { ...user, approve: newApproveStatus } : user
            );
            setUserData(updatedUsers);
          })
          .catch(err => console.log(err));
      };




      useEffect(() => {
        handleFetch();
      }, []);


      if (loading) {
        return <div>Loading...</div>; // Show loading indicator while data is being fetched
      }

      // Filter to show only users with approve: false
  const filteredUsers = userdata.filter(user => user.approve === false);
  return (
    <Fragment>
         <center><h1>Admin Panel - Pending Approvals</h1></center> 
{filteredUsers.length === 0 ? (
  <center>
  <p>No approvals pending.</p>
</center>
) :(
  <div className="home-container">
        {filteredUsers.map((data, index) => (
          <div className="user-card" key={index}>
            <label>Id</label>
            <input type="text" value={data._id} readOnly />
            <label>Name:</label>
            <input type="text" value={data.name} readOnly />
            <label>Phone:</label>
            <input type="text" value={data.phone} readOnly />
            <label>Title</label>
            <input type="text" value={data.title} readOnly />

            <label>Description</label>
            <input type="text" value={data.description} readOnly />

            <label>Industry</label>
            <input type="text" value={data.industry} readOnly />

            <label>Category</label>
            <input type="text" value={data.category} readOnly />

           
            <label>State</label>
            <input type="text" value={data.state} readOnly />
            <label>District</label>
            <input type="text" value={data.district} readOnly />
           

            <label>Role:</label>
              <label>Dealer</label>
              <input type="checkbox" checked={data.role.dealer} readOnly />

              <label>Franchise</label>
              <input type="checkbox" checked={data.role.franchise} readOnly />

              <label>Wholesaler</label>
              <input type="checkbox" checked={data.role.wholesaler} readOnly />

              <label>Stockist</label>
              <input type="checkbox" checked={data.role.stockist} readOnly />

              <label>Distributor</label>
              <input type="checkbox" checked={data.role.distributor} readOnly />

              <label>Agency</label>
              <input type="checkbox" checked={data.role.agency} readOnly />

              <label>Retailer</label>
              <input type="checkbox" checked={data.role.retailer} readOnly />
              <label>Business Buy Outs</label>
              <input type="checkbox" checked={data.role.BusinessBuyOuts} readOnly />
              <label>Invest Partners</label>
              <input type="checkbox" checked={data.role.InvestPartners} readOnly />
              <label>Share Partners</label>
              <input type="checkbox" checked={data.role.SharePartners} readOnly />
              <label>Working Partners</label>
              <input type="checkbox" checked={data.role.WorkingPartners} readOnly />
              <label>Share Buyers</label>
              <input type="checkbox" checked={data.role.ShareBuyers} readOnly />
              <label>Seed Funders </label>
              <input type="checkbox" checked={data.role.SeedFunders } readOnly />
              <label>Venture Capitals </label>
              <input type="checkbox" checked={data.role.VentureCapitals } readOnly />

              








            <label>Space</label>
            <input type="text" value={data.space} readOnly />

            <label>Revenue</label>
            <input type="text" value={data.revenue} readOnly />
            <label>Duration</label>
            <input type="text" value={data.duration} readOnly />

            <label>Investment Range</label>
            Min Value{' '}
            <input type="text" value={data.investmentrange ? data.investmentrange.min : ""} readOnly />
            - Max Value{' '}
            <input type="text" value={data.investmentrange ? data.investmentrange.max : ""} readOnly />

            <button 
              className="approve-button" 
              onClick={() => approveHandler(data._id, data.approve)}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
)}
         
    </Fragment>
  )
}

export default Buyercontrol