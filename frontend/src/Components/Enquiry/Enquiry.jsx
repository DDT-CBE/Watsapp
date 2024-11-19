import React, { Fragment } from 'react';
import './enquiry.css'; // Import the CSS file for styling
import envelop from "../Assets/icons8-secure-mail-100.png"

const Enquiry = () => {
  return (
    <Fragment>
        
        <div className="enquiry-container">
        <center><h1 className='heading'>Have a question? Let's talk.</h1></center>
                <div className="enquiry-form">
                <div className="enquiry-left">
                    <img src={envelop} alt="Envelope" className="enquiry-image" />
                </div>
                <div className="enquiry-right">
                    <h2>Get in touch</h2>
                    <form>
                    <div className="form-group">
                        <input type="text" placeholder="Name" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Message" className="form-control"></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Send</button>
                    </form>
                </div>
                </div>
            </div>
    </Fragment>
    
    
  );
}

export default Enquiry;
