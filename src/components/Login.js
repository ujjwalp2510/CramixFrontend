import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from './Logo'

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const [newPassword, setNewPassword] = useState("");
  const [inputOTP, setinputOTP] = useState("");
  const handleOnChangenewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleOnChangeinputotp = (e) => {
    setinputOTP(e.target.value);
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
      const { data } = await axios.post(
        "https://cramixbackend.onrender.com/api/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/dashboard", {state:{year:data.user.year, branch:data.user.branch}});
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };  
      const [ isForgotPasswordVisible, setForgotPasswordVisibility ] = useState(false); 
      const [isOTPFormVisible, setOTPFormVisibility] = useState(false);
      const [otp, setotp] = useState("");
      const handleForgotPassword=(e)=>{
        e.preventDefault();
        setForgotPasswordVisibility(true);
      }
      const handleForgotPasswordSubmit = async(e)=>{
        e.preventDefault();
        if(!inputValue.email){
          handleError("Enter the email");
        }else{
        setForgotPasswordVisibility(false);
        try {
          const { data } = await axios.get(
            `https://cramixbackend.onrender.com/api/otpverification/${inputValue.email}`
          );
          setotp(data.otp);
          const { success, message } = data;
          if (success) {
            setOTPFormVisibility(true);
            handleSuccess(message);
          } else {
            handleError(message);
          }
        } catch (error) {
          console.error(error);
          handleError("Error sending OTP");
        }
      }}
      const handleOTPSubmit=async(e)=>{
        e.preventDefault();
      try {
      const success = (inputOTP===otp);
      setinputOTP("");
      if (success) {
        const userD = {email:inputValue.email, newPassword:newPassword}
        setOTPFormVisibility(false);
        const passwordChangeResponse = await axios.post(
          "https://cramixbackend.onrender.com/api/passwordchange",
          userD,
          { withCredentials: true }
        );
        if(passwordChangeResponse.data.success){
        toast.success("Password Updated", {
          position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
        });
      }
      else{
        toast.error(passwordChangeResponse.data.msg, {
          position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
        });
      }
    }
      else{
        toast.error("Invalid OTP", {
          position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
        });}}
        catch (error) {
          console.error(error);
          handleError("Error verifying OTP");
        }
      }
  return (
    <div className="lcontainer">
        <div className="lleft-container">
        </div>
        <div className="lright-container">
            {/* <h1 id="lheading1">Cramix</h1> */}
            <div id="lheading1"><Logo/></div>
            <h4 id="lheading4">Organize &nbsp;Prioritize&nbsp; Conquer</h4><br /><br /><br />
            {!isForgotPasswordVisible && !isOTPFormVisible && <form id="lform" onSubmit={handleSubmit}>
                <input id='lform1' type="email" name="email" value={email} placeholder="Enter your email" onChange={handleOnChange} />
                <input id='lform1' type="password" name="password" value={password} placeholder="Enter your password" onChange={handleOnChange} />
                <input id='lform2' type="submit" value="Log In" />
            </form>}
            {!isForgotPasswordVisible && !isOTPFormVisible && <div className="lcreateaccount">New User?<Link to={"/signup"} id="lcreateaccount">Create Account</Link></div>}
            {!isForgotPasswordVisible && !isOTPFormVisible && <Link id="forgotpassword" onClick={handleForgotPassword}>Forgot Password?</Link>}
            {isForgotPasswordVisible && <form id="lform" onSubmit={handleForgotPasswordSubmit}>
                <input id='lform1' type="email" name="email" value={email} placeholder="Enter your email" onChange={handleOnChange} />
                <input id='lform1' type="password" name="newPassword" value={newPassword} placeholder="Enter your new password" onChange={handleOnChangenewPassword} />
                <input id='lform2' type="submit" value="Change Password" />
            </form>}
            {isOTPFormVisible && <form id="lform" onSubmit={handleOTPSubmit}>
                <input id='lform1' type="email" name="email" value={email} placeholder="Enter your email" onChange={handleOnChange} />
                <input id='lform1' type="text" name="inputOTP" value={inputOTP} placeholder="Enter OTP" onChange={handleOnChangeinputotp} />
                <input id='lform2' type="submit" value="Verify OTP" />
            </form>}
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
theme="light" />
</div>
  );
};

export default Login;