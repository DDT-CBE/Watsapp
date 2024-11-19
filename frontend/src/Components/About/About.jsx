import React, { Fragment } from 'react'
import image1 from "../Assets/pexels-fauxels-3183197.jpg"
import "./about.css"

const About = () => {
  return (
    <Fragment>
         <center ><h1 className='heading'>About Us</h1></center> 
        <div className='aboutcontainer'>
        
        <div className='aboutbox'>
            <div className='left'>
                <img src={image1} alt="" />
            </div>
            <div className='right'>
                <h1>Who We Are</h1>
                <p>
                  Introducing Dealer's Connect: India's 1st Business Matchmaking Consultant Service.

                  Connecting Business Providers and Business Seekers.

                  Imagine a platform where business providers and seekers connect seamlessly, fostering growth and expansion. Dealer's Connect makes this vision a reality.

<br />
                  <strong>The Concept:</strong>

                  Inspired by successful matchmaking models:

                  - Job consultancy (employer-employee)
                  - Matrimonial consultancy (bride-groom)

                  Dealer's Connect is a pioneering platform connecting:

                  - Business Providers (expanding businesses)
                  - Business Seekers (starting new ventures)

<br />
                  <strong>Who are Business Providers?</strong>

                  Seeking expansion through:
                  - Dealers
                  - Distributors
                  - Franchisees
                  - Wholesalers
                  - Stockists
                  - Agency partnerships
                  - Business sellouts
                  - Investment partners
                  - Shareholders
<br />
                  <strong>Who are Business Seekers?</strong>

                  Looking to start new businesses via:
                  - Franchisors
                  - Dealers
                  - Stockists
                  - Business buyouts
                  - Good revenue models
                  - Interested industries/categories
                  - Interested districts/areas
                  - Budget-friendly options
<br />
                  <strong>Unique Business Concepts:</strong>

                  A one-stop platform for:
                  - New business opportunities
                  - Additional income streams
                  - Part-time businesses
                  - Home-based businesses
                  - Business sellouts and buyouts
                  - Investment partnerships
                  - Startup funding
<br />
                  <strong>Market Demands:</strong>

                  Every business person needs:
                  - Promotion
                  - Expansion
                  - Increased income
<br />
                  <strong>Current Challenges:</strong>

                  NO single platform for business providers and seekers, reliable databases, or competitors. No consultancy centers, marketing, or web portals.
<br />
                  <strong>Dealer's Connect: Bridging the Gap</strong>

                  - Comprehensive database of business providers and seekers
                  - Expert consultancy services
                  - Personalized matchmaking
                  - Increased business opportunities
                  - Enhanced revenue growth

                  Join Dealer's Connect today and revolutionize your business!
                </p>
            </div>
        </div>
        </div>
    </Fragment>
  )
}

export default About;
