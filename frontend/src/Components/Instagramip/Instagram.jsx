import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Nav2 from '../Nav2/Nav2';

import "./buyerpage.css"

const url = process.env.REACT_APP_API_URL;

const Instagramip = () => {
    const [sellerdata, setSellerData] = useState([]);
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const [stateFilter, setStateFilter] = useState('');
    const [districtFilter, setDistrictFilter] = useState('');
    const [industryFilter, setIndustryFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const toggleFilterPanel = () => {
        setFilterPanelOpen(!filterPanelOpen);
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (stateFilter) params.append('state', stateFilter);
        if (districtFilter) params.append('district', districtFilter);
        if (industryFilter) params.append('industry', industryFilter);
        if (categoryFilter) params.append('category', categoryFilter);

        fetchSellerData(params.toString());
        toggleFilterPanel(); // Close filter panel after applying filters
    };

    const fetchSellerData = (queryString = '') => {
        setLoading(true);
        axios
            .get(`${url}getinstagramdata?${queryString}`)
            .then((res) => {
                if (res.data.length === 0) {
                    setErr('No Profile found');
                } else {
                    setErr(null);
                    setSellerData(res.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setErr(err.response?.data?.message || 'An error occurred');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchSellerData();
    }, []);

    if (loading) {
        return <div className="loader"></div>;
    }

    return (
        <Fragment>
            <Nav2 />
            <h1 className="buyer-title">Instagram Profiles</h1>
        

            <button className="filter-btn" onClick={toggleFilterPanel}>
                Filter Options
            </button>

            <div className={`filter-panel ${filterPanelOpen ? 'open' : ''}`}>
                <h2>Filter Profiles</h2>
                <label>State</label>
                <input
                    type="text"
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                />
                <label>District</label>
                <input
                    type="text"
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                />
                <label>Industry</label>
                <input
                    type="text"
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                />
                <label>Category</label>
                <input
                    type="text"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                />
                <button onClick={applyFilters}>Apply Filters</button>
                <button onClick={toggleFilterPanel}>Close</button>
            </div>

            {err ? (
                <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
                    <h2>{err}</h2>
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>State</th>
                                <th>District</th>
                                <th>Industry</th>
                                <th>Category</th>
                                <th>Channel Name</th>
                                <th>Channel Link</th>
                                <th>Subscribers</th>
                                <th>Average Reaches</th>
                                <th>Campaign Duration</th>
                                <th>Campaigns/Month</th>
                                <th>Pricing</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellerdata.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.state}</td>
                                    <td>{data.district}</td>
                                    <td>{data.industry}</td>
                                    <td>{data.category}</td>
                                    <td>{data.channelname}</td>
                                    <td>
                                        <a href={data.channellink} target="_blank" rel="noopener noreferrer">
                                            {data.channellink}
                                        </a>
                                    </td>
                                    <td>{data.subscribers}</td>
                                    <td>{data.averageReaches}</td>
                                    <td>{data.campaignDuration}</td>
                                    <td>{data.campaignsPerMonth}</td>
                                    <td>Rs.{data.pricing}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Fragment>
    );
};

export default Instagramip;
