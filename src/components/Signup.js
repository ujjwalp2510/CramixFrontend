import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import google from '../static/google.png';
import '../styles/Signup.css';
import 'react-toastify/dist/ReactToastify.css';
import Logo from './Logo';

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    name: "",
    year: 1,
    branch: "CSE",
  });

  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [inputotp, setinputotp] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Request OTP for email verification
      const { data } = await axios.get(
        `https://cramixbackend.onrender.com/api/otpverification/${inputValue.email}`
      );
      setinputotp(data.otp);
      const { success, message } = data;

      if (success) {
        // Show OTP form if OTP request is successful
        setShowOtpForm(true);
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error(error);
      handleError("Error sending OTP");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verify OTP
      const success = (inputotp===otp);

      if (success) {
        // If OTP verification is successful, proceed with signup
        const signupData = {
          ...inputValue,
        };

        const signupResponse = await axios.post(
          "https://cramixbackend.onrender.com/api/signup",
          signupData,
          { withCredentials: true }
        );
        localStorage.setItem('token', signupResponse.data.token);
        localStorage.setItem('userData', JSON.stringify(signupResponse.data.user));
        const { success: signupSuccess, message: signupMessage } =
          signupResponse.data;

        if (signupSuccess) {
          handleSuccess(signupMessage);
          navigate("/dashboard", {
            state: { year: inputValue.year, branch: inputValue.branch },
          });
        } else {
          handleError(signupMessage);
        }
      } else {
        // handleError(message);
      }
    } catch (error) {
      console.error(error);
      handleError("Error verifying OTP");
    }
  };

  return (
    <div className="scontainer">
      <div className="sleft-container"></div>
      <div className="sright-container">
        {/* <h1 id="sheading1">Cramix</h1> */}
        <div id="sheading1"><Logo/></div>
            <h4 id="sheading4">Organize &nbsp;Prioritize&nbsp; Conquer</h4><br /><br /><br />
        <form id="sform" onSubmit={handleSubmit}>
          <input
            id="sform1"
            type="email"
            name="email"
            value={inputValue.email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
          {showOtpForm && (
            <>
              <input
                id="sform1"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
              />
              <button id='sform2' type="button" onClick={handleOtpSubmit}>
                Verify OTP
              </button>
            </>
          )}
          {!showOtpForm && (
            <>
              <input
                id="sform1"
                type="text"
                name="name"
                value={inputValue.name}
                placeholder="Enter your name"
                onChange={handleOnChange}
              />
              <input
                id="sform1"
                type="password"
                name="password"
                value={inputValue.password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
              <select
                id="sform3"
                name="year"
                onChange={handleOnChange}
                value={inputValue.year}
              >
                <option value='1'>1st Year</option>
                    <option value='2'>2nd Year</option>
                    <option value='3'>3rd Year</option>
                    <option value='4'>4th Year</option>
              </select>
              <select
                id="sform3"
                name="branch"
                onChange={handleOnChange}
                value={inputValue.branch}
              >
                <option value='CSE'>CSE</option>
                    <option value='IT'>IT</option>
                    <option value='ECE'>ECE</option>
                    <option value='EEE'>EEE</option>
              </select>
              <button type="submit" id="sform2">Sign Up</button>
            </>
          )}
        </form>
        <br />
        <br />
        <div className="createaccount">
          Existing User?<Link to={"/login"} id="createaccount">
            Log In
          </Link>
        </div>
      </div>
      <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"/>
    </div>
  );
};

export default Signup;
