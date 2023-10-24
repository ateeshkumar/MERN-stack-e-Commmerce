import React from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'

const Users = () => {
  return (
    <>
     <Layout title='all users'>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h4>All Users</h4>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Users
