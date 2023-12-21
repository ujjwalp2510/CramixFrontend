import '../styles/ModYearBranch.css';
import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function ModYear(props){
    const navigate = useNavigate();
    const [selectedYear, setYear] = React.useState(1);

    const handleYearChange = (e) =>{
        setYear(e.target.value);
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(props.userData){
        const modData = {email:props.userData.email, mody:selectedYear};
        await axios.post("https://cramixbackend.onrender.com/api/modyb/year", modData, {withCredentials:true});
        localStorage.removeItem('token');
        localStorage.removeItem('userData');  
        navigate('/login');
    }
}
    return(
        <div className='centrecardd'>
            <div id='h3'>Change your Year</div><br />
            <form id='yearnbranch' onSubmit={handleSubmit}>
                <label for="year">Year</label><br />
                <select name='year' onChange={handleYearChange}>
                    <option value='1'>1st Year</option>
                    <option value='2'>2nd Year</option>
                    <option value='3'>3rd Year</option>
                    <option value='4'>4th Year</option>
                </select>
                <div>
                <button onClick={props.onClick} id='cancelbutton'>Cancel</button>
                <input type='submit' value='Change'/>
                </div>
            </form>
        </div>
    )
}
export default ModYear;