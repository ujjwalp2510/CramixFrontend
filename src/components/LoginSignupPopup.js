import React from 'react';
import '../styles/LoginSignupPopup.css';
import {Link, useNavigate} from 'react-router-dom';

const LoginSignupPopup = (props) => {
  const navigate = useNavigate();
  const handleLoginClick=(e)=>{
    e.preventDefault();
    navigate('/login');
  }
  const handleSignupClick=(e)=>{
    e.preventDefault();
    navigate('/signup');
  }
  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>Kindly <Link id='paralink' onClick={handleLoginClick}>Login</Link> or <Link id='paralink' onClick={handleSignupClick}>Signup</Link> to access all features</p>
      </div>
    </div>
  );
};

export default LoginSignupPopup;
