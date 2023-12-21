import { useLocation, Link} from "react-router-dom";
import toprightimg from "../static/new1.svg";
import liveimg from "../static/play-button.png"
import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Main.css'
import SideArea from './SideArea'
import LoginSignupPopup from './LoginSignupPopup';
import Discussions from "./Discussions";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Main(){
    const location = useLocation();
    let subjectname = (location.state!=null)?location.state.subjectname:"NULL";;
    const [subjectData, setSubjectData] = useState({});
    const navigate = useNavigate();
    const [isAuthorized, setAuthorized] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData"));
    useEffect(() =>{
      if(subjectname=="NULL"){
          navigate('/dashboard');
          subjectname="";
      }},[]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`https://cramixbackend.onrender.com/api/main/${subjectname}`, {
                              headers: {
                              'Authorization': `Bearer ${token}`,
                              },
                         });
            setSubjectData(response.data);
            setAuthorized(true);
          } catch (error) {
            setAuthorized(false);
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [subjectname]);

      const handleClick = (e)=>{
        e.preventDefault();
        if(subjectData.livesession){
        navigate('/meeting', {state:{livesession:subjectData.livesession, userData:userData}});
        }
        else{
          toast('No live session right now. Stay tuned!', {
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
      const [isNotesVisible, setNotesVisibility] = useState(false);
      const [content, setContent] = useState({});
      const [contentHeading, setcontentHeading] = useState("");
      const [isDiscussionsVisible, setDiscussionsVisibilty] = useState(false);
      const handleContentClick=(e)=>{
        e.preventDefault();
        setNotesVisibility(true);
        if(e.target.innerHTML==='Notes'){
          setContent(subjectData.notes);
          setcontentHeading("Notes");
        }
        else if(e.target.innerHTML==='Store'){
          setContent(subjectData.store);
          setcontentHeading("Store");
        }
      }
      const handleCloseClick=(e)=>{
        e.preventDefault();
        setNotesVisibility(false);
        setDiscussionsVisibilty(false);
      }
      const handleDiscussions=(e)=>{
        e.preventDefault();
        setDiscussionsVisibilty(true);
      }
    return(
        <div className="main">
            <div className="top">
                <div id="topleft"><div id='subjecttitle'>{subjectname}</div>
                    <Link className="nounderline"id="livebutton" onClick={handleClick}>
                        <img id = 'liveimg' src={liveimg} alt="toprightimg"></img>
                        <span id="livenow">Live Now</span>
                        </Link>
                        <Link className="nounderline" id="imptopics" to={subjectData.importanttopics}>
                        <span>Important Topics/Questions</span>
                        </Link>
                        <Link className="nounderline" id="downloadsyllabus" to={subjectData.syllabus}>
                        <span>Download Syllabus</span>
                        </Link>
                </div>
                <img id='toprightimg'src={toprightimg} alt="toprightimg"></img>
            </div>
            <div className="bottom">
                <Link className="nounderline" id="notes" onClick={handleContentClick}>Notes</Link>
                <Link className="nounderline" id="discussions" onClick={handleDiscussions}>Discussions</Link>
                <Link className="nounderline" id="store" onClick={handleContentClick}>Store</Link>
            </div>
            {(isNotesVisible) && <div id="sideArea"><SideArea content={content} contentHeading={contentHeading} onClick={handleCloseClick}/></div>}
            {(isDiscussionsVisible) && <div id="discussionsArea"><Discussions onClick={handleCloseClick}  chatId={subjectData.chatId}/></div>}
            {(!isAuthorized) && <LoginSignupPopup/>}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
        </div>
    )
};
export default Main;