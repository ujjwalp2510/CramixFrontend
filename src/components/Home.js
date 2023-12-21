import '../styles/Home.css';
import Logo from './Logo';
import Navbar from './Navbar';
import Branches from './Branches'
// import { useNavigate } from 'react-router-dom';
import React from 'react';

function Home() {
    // const navigate = useNavigate();
    const [isVisible, setVisibility] = React.useState(false);
    const handleButtonClick = () => {
        setVisibility(true);
    };
    const closeCard = () => {
        setVisibility(false);
    }
    return (
        <div className="home">
            <div id="left">
                <div className="leftcontent">
                    <Logo />
                    <div id="slogancontainer"><span id="excel">Excel</span> Last-Minute <sapn id="exam">Exam</sapn> Prep with Us</div>
                    <div id="description">Exclusively tailored to your syllabus, Cramix guarantees laser-focused, concise prep designed for unique exam success. Our platform provides exact syllabus coverage, live sessions, and personalized guidance, ensuring you are fully equipped for triumph.</div>
                    <button id="getstarted" onClick={handleButtonClick}>Get Started</button>
                </div>
                {(isVisible) && <div id="overlay"><Branches onClick={closeCard}/></div>} 
            </div>
            <div id="right">
                <Navbar />
            </div>
        </div>
    )
}
export default Home;