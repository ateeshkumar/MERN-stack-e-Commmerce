import React from 'react'
import { Link } from 'react-router-dom'
import './css/footer.css';
const Footer = () => {
  return (
    <>
     <div className="footer">
        <h1>Alright reserved &copy; e-Commerce</h1>
        <div className="footer-link">
          <Link to='/about'>About </Link>
          <Link to='/contact'>| Contact </Link>
          <Link to='/policy'>| Privacy Policy</Link>
        </div>
      </div> 
    </>
  )
}

export default Footer
