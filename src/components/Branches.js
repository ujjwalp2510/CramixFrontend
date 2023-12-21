import '../styles/Branches.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
function Branches(props){
    const navigate = useNavigate();
    const [selectedYear, setYear] = React.useState(1);
    const [selectedBranch, setBranch] = React.useState("CSE");

    const handleYearChange = (e) =>{
        setYear(e.target.value);
    }
    const handleBranchChange = (e) =>{
        setBranch(e.target.value);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate('/dashboard', { state: { year: selectedYear, branch: selectedBranch } });
    }
    return(
        <div className='centrecard'>
            <div id='h3'>Select your Year and Branch</div><br />
            <form onSubmit={handleSubmit} id='yearnbranch'>
                <label for="year">Year</label><br />
                <select name='year' onChange={handleYearChange}>
                    <option value='1'>1st Year</option>
                    <option value='2'>2nd Year</option>
                    <option value='3'>3rd Year</option>
                    <option value='4'>4th Year</option>
                </select><br /><br /><br />
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
                <input type='submit' value='Done'/>
                </div>
            </form>
        </div>
    )
}
export default Branches;