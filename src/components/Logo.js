import '../styles/Home.css';
import logo from '../static/logo-color.png';
import React from 'react';
import { Link } from 'react-router-dom';

function Logo(){
    return (
        <Link to="/" className='a'><img src={logo} alt="Logo" /></Link>
    )
}
export default Logo;