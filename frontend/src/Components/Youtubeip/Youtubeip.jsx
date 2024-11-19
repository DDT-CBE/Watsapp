import React, { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import Nav2 from '../Nav2/Nav2';
import Search from '../Search/Search';
import { useSearchParams } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;

const Youtubeip = () => {
    const [sellerdata, setSellerData] = useState([]);
    const [activeSellerId, setActiveSellerId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchparams] = useSearchParams();
    const [err, setErr] = useState(null);

    const getsellerdata = () => {
        axios.get(`${url}getyoutubedata?` + searchparams.toString())
            .then(res => {
                if (res.data.length === 0) {
                    setErr("No Profile found");
                } else {
                    setErr(null);
                    setSellerData(res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setErr(err.response?.data?.message || "An error occurred");
                setLoading(false);
            });
    };

    useEffect(() => {
        getsellerdata();
    }, [searchparams]);

    const toggleBtnMore = (id) => {
        setActiveSellerId(activeSellerId === id ? null : id);
    };

    if (loading) {
        return <div className='loader'></div>;
    }

    return (
        <Fragment>
            <Nav2 />
            <h1 className="buyer-title">Youtube</h1>
            <Search />

            {err ? (
                <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
                    <h2>{err}</h2>
                </div>
            ) : sellerdata.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'gray', marginTop: '20px' }}>
                    <h2>No data found</h2>
                </div>
            ) : (
                <div className="buyer-container">
                    {sellerdata.map((data, index) => (
                        <div className="buyer-card" key={index}>
                            <table className="details-tables">
                                <tbody>
                                    <tr>
                                        <th>State</th>
                                        <td>{data.state}</td>
                                    </tr>
                                    <tr>
                                        <th>District</th>
                                        <td>{data.district}</td>
                                    </tr>
                                    <tr>
                                        <th>Industry</th>
                                        <td>{data.industry}</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>{data.category}</td>
                                    </tr>
                                    <tr>
                                        <th>Channel Name</th>
                                        <td>{data.channelname}</td>
                                    </tr>
                                    <tr>
                                        <th>Channel Link</th>
                                        <td><a href={data.channellink} target="_blank" rel="noopener noreferrer">{data.channellink}</a></td>
                                    </tr>
                                </tbody>
                            </table>

                            <button className={activeSellerId === data._id ? "morehide" : 'more'} onClick={() => toggleBtnMore(data._id)}>
                                More
                            </button>

                            {activeSellerId === data._id && (
                                <table className="details-table">
                                    <tbody>
                                        
                                        <tr>
                                            <th>Number of Subscribers</th>
                                            <td>{data.subscribers}</td>
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
                                            <th>Campaigns per Month</th>
                                            <td>{data.campaignsPerMonth}</td>
                                        </tr>
                                        <tr>
                                            <th>Pricing</th>
                                            <td>Rs.{data.pricing}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </Fragment>
    );
};

export default Youtubeip;
