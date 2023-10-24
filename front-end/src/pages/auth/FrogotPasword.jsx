import React,{useState} from 'react'
import '../css/form.css';
import Layout from '../../component/layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
const FrogotPasword = () => {
    const naviagte = useNavigate();
    const [input,setInput] = useState({
        email:'',
        question:'',
        newPassword:''
        
    })
    const handleSubmit=async(e)=>{
        e.preventDefault();
       
        try {
             const data = await axios.post(`http://localhost:8080/api/v1/auth/forgot-password`,{
                email:input.email,
                question:input.question,
                newPassword:input.newPassword,
             })
             if(data.data.success){    
                toast.success(data.data.massage);            
                naviagte('/login');
                
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
    <Layout title='forgot password'>
        <div className="form-container">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit} className='form-tag'>
                <div className="input-box">
                    <label htmlFor="email">Email</label>
                    <input type="Email" 
                    name='email'
                    value={input.email} 
                    onChange={handleChange}
                    placeholder='Enter Your Email'
                    required/>
                </div>
                <div className="input-box">
                    <label htmlFor="question">Your best friend</label>
                    <input type="question" 
                    name='question'
                    value={input.question} 
                    onChange={handleChange}
                    placeholder='Enter Your best friend'
                    required/>
                </div>
                <div className="input-box">
                    <label htmlFor="password">New Password</label>
                    <input type="password" 
                    name='newPassword'
                    value={input.newPassword} 
                    onChange={handleChange}
                    placeholder='Enter Your New Password'
                    required/>
                </div>
               
                
                <input style={{width:'180px'}} type="submit" value="Reset Password"/>
            </form> 
        </div>
    </Layout>
      
    </>
  )
}

export default FrogotPasword
