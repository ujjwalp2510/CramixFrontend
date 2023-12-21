import "../styles/Dashboard.css";
import whencloseimg from '../static/download-removebg-preview.jpg'
import profileimg from '../static/profilelogo.webp'
import previousimg from '../static/previous.png';
import nextimg from '../static/next.png';
import { useState, useEffect, useRef } from "react";
import {Link, useNavigate, useLocation } from "react-router-dom";
import 'boxicons';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';
import ModYear from "./ModYear.js";
import ModBranch from "./ModBranch.js";

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

function Dashboard(){
  
  const [isModYearVisible, setModYearVisibility] = useState(false);
  const [isModBranchVisible, setModBranchVisibility] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
    const userData = JSON.parse(localStorage.getItem("userData"));
    let year,branch;
    if(!userData){
    year = (location.state!=null)?location.state.year:"NULL";
    branch = (location.state!=null)?location.state.branch:"NULL";
    }
    else{
      year = userData.year;
      branch = userData.branch;
    }
    const [subjects, setSubjects] = useState([]);

    useEffect(() =>{
    if(year==="NULL" || branch==="NULL"){
        navigate('/');
        year = 1;
        branch="CSE";
    }},[year,branch,navigate]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://cramixbackend.onrender.com/api/dashboard/${year}/${branch}`);
            setSubjects(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [branch, year]);
  
  const [isSideBarClose, setSideBarClose] = useState(true);
  function onMouseOver() {
    if(window.innerWidth>786){
    setSideBarClose(false);
    document.getElementById("whenclose").style.display = "none";
    document.getElementById("whenopen").style.display = "inline";
  }}
  function onMouseOut() {
    if(window.innerWidth>786){
    setSideBarClose(true);
    document.getElementById("whenopen").style.display="none";
    document.getElementById("whenclose").style.display = "inline";
  }}
  function handleCardClick(props){
    navigate('/main', {state:{subjectname:props}})
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const cardsContainerRef = useRef(null);
  const cardRef = useRef(null);
  
  useEffect(() => {
      const cardWidth = cardRef.current?.offsetWidth || 0;
      const cardCount = cardsContainerRef.current?.childElementCount || 0;
  
      setCardWidth(cardWidth);
      setCardCount(cardCount);
  }, [cardRef.current, cardsContainerRef.current]);

  const scrollCards = (direction) => {
    if (!cardsContainerRef.current) return;

    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (direction === "right" && currentIndex < cardCount - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    if (!cardsContainerRef.current) return;

    const scrollAmount = currentIndex * cardWidth;
    cardsContainerRef.current.style.transform = `translateX(-${scrollAmount}px)`;

    handleScroll();
  }, [currentIndex, cardWidth]);
  const handleScroll = () => {
    if (!cardsContainerRef.current) return;

    const scrollLeftBtn = document.querySelector(".scroll-left");
    const scrollRightBtn = document.querySelector(".scroll-right");

    // Check if there is more content to the left
    scrollLeftBtn.style.opacity = currentIndex > 0 ? "1" : "0.6";

    // Check if there is more content to the right
    scrollRightBtn.style.opacity = currentIndex < cardCount - 1 ? "1" : "0.6";
  };

  useEffect(() => {
    handleScroll();
  }, [currentIndex, cardCount]);
  const renderCards = () => {
    return chunkArray(subjects, 3).map((chunk, index) => (
      <div className="cards" key={index} ref={cardRef}>
        {chunk.map((card, cardIndex) => (
          <div className="card" key={cardIndex} onClick={()=>handleCardClick(card.name)}>
            <div className="content">
              <div className="img">
                <img src={card.img} alt="" />
              </div>
              <div className="details">
                <div className="name">{card.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  const handleLogout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  }
  const onYClick=()=>{
    setModYearVisibility(false);
  }
  const onBClick=()=>{
    setModBranchVisibility(false);
  }
    return (
        <div id="test">
            <div className={isSideBarClose?"sidebar close":"sidebar"} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <div className="logo-details">
          <img id='whenclose' src={whencloseimg} alt=""/>
          <span id='whenopen'>Dashboard</span> 
        </div>
        <ul className="nav-links">
            <li>
                <div className="profile-details">
                    {(window.innerWidth>786) &&(<div className="profile-content">
                        <img src={profileimg} alt="profileImg"/>
                        <div className="name-job">
                            <div className="profile_name">{userData?userData.name:"Anonymous"}</div>
                        </div>
                    </div>)}
                    <i className='bx bx-log-out' onClick={handleLogout}></i>
                </div>
            </li>
            <li>
                <Link onClick={()=>{setModYearVisibility(true)}}>
                    <i className='bx bx-grid-alt'></i>
                    <span className="link_name">Modify Year</span>
                </Link>
            </li>
            <li>
                <div className="iocn-link">
                    <Link onClick={()=>{setModBranchVisibility(true)}}>
                        <i className='bx bx-collection'></i>
                        <span className="link_name">Modify Branch</span>
                    </Link>
                </div>
                <ul className="sub-menu">
                    <li id="selectedBranchItem"><Link className="link_name">Modify Branch</Link></li>
                </ul>
            </li>
        </ul>
    </div>
    <div className="home-section">
        <div className="home-content">
            <p>Courses</p>
        </div>
        <div className="container">
            <div className="main-card" ref={cardsContainerRef}>
            {renderCards()}
          </div>
          <div id="scrollbuttons">
<button className="scroll-btn scroll-left" onClick={()=>scrollCards('left')}><img src={previousimg} alt="" /></button>
<button className="scroll-btn scroll-right" onClick={()=>scrollCards('right')}><img src={nextimg} alt="" /></button>
</div></div></div>
{(isModYearVisible) && <div id="overlay"><ModYear onClick={onYClick} userData={userData}/></div>} 
{(isModBranchVisible) && <div id="overlay"><ModBranch onClick={onBClick} userData={userData}/></div>} 
          </div>
    )
}
export default Dashboard;