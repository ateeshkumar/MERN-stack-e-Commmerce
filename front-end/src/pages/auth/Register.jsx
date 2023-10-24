import React,{useState} from 'react'
import Layout from '../../component/layout/Layout'
import '../css/form.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'


const Register = () => {
    const naviagte = useNavigate();
    const [input,setInput] = useState({
        name:'',
        email:'',
        password:'',
        phone:'',
        question:'',
        address:''
    })
    const handleSubmit=async(e)=>{
        e.preventDefault();
       
        try {
             const data = await axios.post(`http://localhost:8080/api/v1/auth/register`,{
                name:input.name,
                email:input.email,
                password:input.password,
                phone:input.phone,
                address:input.address,
                question:input.question,
                
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
    <Layout title='register'>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className='form-tag'>
                <div className="input-box">
                    <label htmlFor="name">Name</label>
                    <input type="name"
                    name="name"
                    value={input.name} 
                    onChange={handleChange}
                    placeholder='Enter Your Name'
                    required/>
                </div>
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
                    <label htmlFor="password">Password</label>

                    <input type="password" 
                    name='password'
                    value={input.password} 
                    onChange={handleChange}
                    placeholder='Enter Your Password'
                    required/>
                </div>
                <div className="input-box">
                    <label htmlFor="phone">Phone</label>
                    <input type="phone" 
                    name='phone'
                    value={input.phone} 
                    onChange={handleChange}
                    placeholder='Enter Your Phone No.'
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
                    <label htmlFor="address">Address</label>
                    <input type="address" 
                    name='address'
                    value={input.address} 
                    onChange={handleChange}
                    placeholder='Enter Your address'
                    required/>
                </div>
                <input type="submit" value="Sign Up" />
            </form>
            <h5>if already register <Link to='/login'>login here!</Link></h5> 
        </div>
    </Layout>
     
    </>
  )
}

export default Register
