import React from 'react'
import Layout from '../../component/layout/Layout'
import UserMenu from '../../component/layout/UserMenu'
import { useAuth } from '../../context/auth'

const Profiles = () => {
    const [auth,setAuth] = useAuth();
  return (
    <>
      <Layout title='user profile'>
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className="col-md-9">
            <div className="card w-75 p-3">
              <h4>User Name: {auth?.user?.name}</h4>
              <h4>User Email: {auth?.user?.email}</h4>
              <h4>User Phone No: {auth?.user?.phone}</h4>
              <h4>User Address: {auth?.user?.address}</h4>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Profiles
