import React, { useState } from 'react'
import '../css/form.css'
import Layout from '../../component/layout/Layout';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
const Login = () => {
     const naviagte = useNavigate();
     const location = useLocation();
     const [auth,setAuth] = useAuth();
    const [input,setInput] = useState({
        email:'',
        password:''
    })
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
             const data = await axios.post(`http://localhost:8080/api/v1/auth/login`,{
                email:input.email,
                password:input.password,
             })
             if(data?.data.success){ 
                toast.success(data?.data.massage); 
                setAuth({
                    ...auth,
                    user:data?.data.user,
                    token:data?.data.token
                });
                localStorage.setItem("auth",JSON.stringify(data?.data));
                naviagte(location.state || '/');
                
             }else{
                console.log()
                toast.error("Something went wrong");
             }
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
        }
    }
    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
  return (
    <>
     <Layout title='login'>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='form-tag'>
                <div className="input-box">
                    <label htmlFor="email">Email</label>
                    <input type="Email" 
                    name='email'
                    value={input.email}
                    onChange={handleChange}
                    placeholder='Enter Your Email'/>
                </div>
                <div className="input-box">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                    name='password' 
                    value={input.password}
                    onChange={handleChange}
                    placeholder='Enter Your Password'/>
                    <h5 onClick={()=>naviagte('/forgot-password')} 
                    style={{cursor:'pointer',color:'blue'}}>Forgot password ??</h5>
                </div>
                
                <input type="submit" value="Login" />
            </form> 
             <h5>if not register <Link to='/register'>Register here!</Link></h5>
        </div>
    </Layout>
    </>
  )
}

export default Login
