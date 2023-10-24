import React, { useEffect, useState } from 'react'
import './css/header.css';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
const Header = () => {
  const [dashboard,setDashboard] = useState('')
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user:null,
      token:''
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
    navigate('/login');
  }
  useEffect(()=>{
    if(auth?.user?.role===1){
      setDashboard('admin')
    }else{
      setDashboard('user');
    }
  },[auth]);
  return (
    <>
      <div className="navbar">
        <div className="nav-left">
          <h1>e-Commerce</h1>
        </div>
        <div className="nav-right">
          <Link to='/'>Home</Link>
          <Link to='/about'>Category</Link>
           <Link to={`/dashboard/${dashboard}`}>
            {auth?.user?.name}</Link>
          {auth.user?(
            <Link onClick={handleLogout} to='/login'>Logout</Link>
          ):(
          <Link to='/login'>Login</Link>
          )
}
         
          <Link to='/cart'>Cart(0)</Link>
        </div>
      </div>
    </>
  )
}

export default Header
