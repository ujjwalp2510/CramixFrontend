import '../styles/Home.css';
import {useNavigate} from 'react-router-dom';
function Navbar(){
    const navigate = useNavigate();
    function handleLogin(){
        navigate('/login');
    }
    function handleSignup(){
        navigate('/signup');
    }
    return(
            <div className='navbar'>
            <button id='signin' onClick={handleLogin}>Sign In</button>
            <button id='join' onClick={handleSignup}>Join free</button>
            </div>
    )
}
export default Navbar;