import React, { useEffect, Fragment } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import './find.css';
import { Link, useLocation } from 'react-router-dom';
import Nav2 from '../Nav2/Nav2';

const Influencer = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out' }); // Initialize AOS with desired settings
  }, []);

  return (
    <Fragment>
      <Nav2 />
      <div className='findcontainer'>
        <h1 className='title' data-aos="fade-down">
          For Registration & Search
        </h1>

        {/* Influencer Section */}
        {location.pathname === '/influencer' && (
          <div className='findbox'>
            <Link to={"/youtubeip"} style={{ textDecoration: "none" }}>
              <div className='button2' data-aos="zoom-in">YouTube</div>
            </Link>
            <Link to={"/instagramip"} style={{ textDecoration: "none" }}>
              <div className='button2' data-aos="zoom-in">Instagram</div>
            </Link>
            {/* <Link to={"/watsappip"} style={{ textDecoration: "none" }}>
              <div className='button2' data-aos="zoom-in">WhatsApp Channels</div>
            </Link> */}
          </div>
        )}

        {/* WhatsApp Section */}
        {location.pathname === '/watsapp' && (
          <div className='findbox'>
            <Link to={"/watsappgroup"} style={{ textDecoration: "none" }}>
              <div className='button2' data-aos="flip-left">WhatsApp Group</div>
            </Link>
            <Link to={"/watsappchannel"} style={{ textDecoration: "none" }}>
              <div className='button2' data-aos="flip-left">WhatsApp Channel</div>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Influencer;
