import React, { useState } from 'react'
import Layout from '../../component/layout/Layout'
import UserMenu from '../../component/layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Profiles = () => {
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();
    const [input, setInput] = useState({
      name: auth?.user?.name,
      email: auth?.user?.email,
      password: "",
      phone: auth?.user?.phone,
      address: auth?.user?.address,
    });
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const {data} = await axios.put(
          `http://localhost:8080/api/v1/auth/update-user`,
          {
            name: input.name,
            email: input.email,
            password: input.password,
            phone: input.phone,
            address: input.address,
          }
        );
        if (data.success) {
          setAuth({...auth,user:data?.updateuser})
          let ls = localStorage.getItem('auth');
          ls = JSON.parse(ls);
          ls.user = data.updateuser
          localStorage.setItem('auth',JSON.stringify(ls));

          toast.success(data.massage);
          navigate("/dashboard/user/profile");
        } else {
          console.log();
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    };
    const handleChange = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    };
  return (
    <>
      <Layout title="user profile">
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h4>User Name: {auth?.user?.name}</h4>
                <h4>User Email: {auth?.user?.email}</h4>
                <h4>User Phone No: {auth?.user?.phone}</h4>
                <h4>User Address: {auth?.user?.address}</h4>
                <form onSubmit={handleSubmit} className="form-tag">
                  <div className="input-box">
                    <label htmlFor="name">Name</label>
                    <input
                      type="name"
                      name="name"
                      value={input.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="email">Email</label>
                    <input
                      type="Email"
                      name="email"
                      value={input.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      
                      disabled
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="password">Password</label>

                    <input
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={handleChange}
                      placeholder="Enter Your Password"
                      
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="phone"
                      name="phone"
                      value={input.phone}
                      onChange={handleChange}
                      placeholder="Enter Your Phone No."
                      
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="address">Address</label>
                    <input
                      type="address"
                      name="address"
                      value={input.address}
                      onChange={handleChange}
                      placeholder="Enter Your address"
                      
                    />
                  </div>
                  <input type="submit" value="UPDATE" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Profiles
