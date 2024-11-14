import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import { FaBell } from "react-icons/fa";
import axios from 'axios';


function NavBar() {
  const navigate = useNavigate();


  const handleSignOut = async() =>{
    try {
      const res = await axios.post('/api/auth/signout')
      navigate('/login')
    } catch (e) {
      console.log("error", e)
    }
    }
    return (
      <div className='p-1 flex justify-between bg-transparent'> {/* Set bg-transparent here */}
        <div className='flex items-center'>
          <img src={logo} alt="logo" className='h-20 w-auto' /> {/* Adjust height/width as needed */}
        </div>
        <div className='font-bold text-3xl text-[#1974A6] pr-5 flex items-center'>
          KIHARAS FINANCE
        </div>
        <div className='flex gap-1'>
        <div className='font-bold text-3xl text-[#1974A6] pr-5 flex items-center'>
<Link to = 'notification'>
<FaBell />
</Link>
        </div>
        <div>
          <button className='py-7 pr-2 text-[#1974A6] text-xl' onClick={handleSignOut}>signout</button>
        </div>

        </div>
      </div>
    );
  }
  
  export default NavBar;
