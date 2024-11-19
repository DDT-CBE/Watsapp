import React, { Fragment } from 'react';
import './contact.css'; // Import the CSS file for styling
import phone from "../Assets/icons8-phone-100.png"
import location from "../Assets/icons8-location-100.png"
import mail from "../Assets/icons8-mail-100.png"

const Contact = () => {
  return (
    <Fragment>
 <center><h1 className='heading'>We're here to help. Ask away!</h1></center>
    <div className="contact-container">
        
      <div className="contact-item">
        <div className="icon">
          <img src={location} alt="Visit Us" />
        </div>
        <h3>VISIT US</h3>
       
        <p className="contact-detail">2nd Crosscut Road,Gandhipuram </p>
      </div>

      <div className="contact-item">
        <div className="icon">
          <img src={phone} alt="Call Us" />
        </div>
        <h3>CALL US</h3>
        
        <a href="tel:+919994587405" className='contact-detail'> +91 99945 87405  </a> 
      </div>

      <div className="contact-item">
        <div className="icon">
          <img src={mail} alt="Message Us" />
        </div>
        <h3>MAIL US</h3>
       
        <a href="mailto:info@saastha.com" className='contact-detail'>digiterdarktech@gmail.com</a>
      </div>
    </div>
    </Fragment>
   
  );
}

export default Contact;
