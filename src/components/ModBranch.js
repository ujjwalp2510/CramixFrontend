import '../styles/ModYearBranch.css';
import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function ModBranch(props){
    const navigate = useNavigate();
    const [selectedBranch, setBranch] = React.useState("CSE");

    const handleBranchChange = (e) =>{
        setBranch(e.target.value);
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(props.userData){
        const modData = {email:props.userData.email, modb:selectedBranch};
        await axios.post("https://cramixbackend.onrender.com/api/modyb/branch", modData, {withCredentials:true});
        localStorage.removeItem('token');
        localStorage.removeItem('userData');  
        navigate('/login');
    }
}
    return(
        <div className='centrecardd'>
            <div id='h3'>Change your Branch</div><br />
            <form onSubmit={handleSubmit} id='yearnbranch'>
                <label for="branch">Branch</label><br/>
                <select name='branch' onChange={handleBranchChange}>
                <option value='CSE'>CSE (Core)</option>
                    <option value='IT'>IT</option>
                    <option value='ECE'>ECE</option>
                    <option value='EEE'>EEE</option>
                    <option value='BT'>Biotech</option>
                    <option value='ME'>Mechanical</option>
                    <option value='CVE'>Civil</option>
                    <option value='CME'>Chemical</option>
                    <option value='BKT'>CSE (Block Chain)</option>
                    <option value='BIO'>CSE (Bioinformatics)</option>
                    <option value='BDS'>CSE (Data Science)</option>
                    <option value='IOT'>CSE (IOT)</option>
                    <option value='AIML'>CSE (AI ML)</option>
                    <option value='VLSI'>Electronics (VLSI)</option>
                    <option value='EEI'>EnI (Instrumentation)</option>
                    <option value='MDC'>ECE (Biomedical)</option>
                    <option value='ECS'>Electrical (with CS)</option>
                    <option value='MEV'>Mechanical (EV)</option>
                    <option value='MME'>Mechanical (Manufacturing)</option>
                </select>
                <div>
                <button onClick={props.onClick} id='cancelbutton'>Cancel</button>
                <input type='submit' value='Change'/>
                </div>
            </form>
        </div>
    )
}
export default ModBranch;