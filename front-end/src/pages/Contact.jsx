import React from 'react'
import Layout from '../component/layout/Layout'
import './css/contact.css';
import contact from '../assets/contact.jpg';
// import EmailIcon from '@mui/icons-material/Email';
// import HeadphonesIcon from '@mui/icons-material/Headphones';
import {FaHeadphones, FaMailBulk, FaPhone} from 'react-icons/fa';
const Contact = () => {
  return (
    <div>
      <Layout title='contact'>
        <div className="contact">
          <div className="contact-img">
            <img src={contact} alt="contact"/>
          </div>
          <div className="contact-detail">
            <h1>CONTACT US</h1>
            <p>any query and info about product feel to call anytime we 24X7 avabile</p>
            <p><FaMailBulk/> ateesh2002@gmail.com</p>
            <p><FaPhone/> 1234566</p>
            <p><FaHeadphones/> 1800-0000-0000(toll free)</p>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Contact
