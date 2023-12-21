import './App.css';
import Home from './components/Home';
import Main from './components/Main';
import Meeting from './components/Meeting';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter basename='/'>
    <Router>
      <div className='App'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/main' element={<Main />} />
      <Route path='/meeting' element={<Meeting />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </div>
    </Router>
    </BrowserRouter>
  );
}

export default App;
