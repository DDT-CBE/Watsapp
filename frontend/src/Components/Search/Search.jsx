import React, { useState, Fragment } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Search = () => {
  const [industry, setIndustry] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the current page's path (like /buyeredit, /selleredit)
  const currentPath = location.pathname;

  const searchController = (e) => {
    e.preventDefault();
      navigate(`${currentPath}?industry=${industry}&category=${category}&district=${district}&state=${state}`);
  };

  return (
    <Fragment>
      <form className='search' onSubmit={searchController} role="search">

        <input

        type="search"
        placeholder="Enter State"
        aria-label="Search by State"
        value={state}
        onChange={(e) => setState(e.target.value)} // Controlled input
        />

        <input

        type="search"
        placeholder="Enter District"
        aria-label="Search by District"
        value={district}
        onChange={(e) => setDistrict(e.target.value)} // Controlled input
        />


        <input
          type="search"
          placeholder="Enter Industry"
          aria-label="Search by Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)} // Controlled input
        />

        <input
          type="search"
          placeholder="Enter Category"
          aria-label="Search by Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Controlled input
        />
      
      
        
        <button  type="submit">
          Search
        </button>
      </form>
    </Fragment>
  );
};

export default Search;
