import React from 'react'
import Layout from '../../component/layout/Layout'
import UserMenu from '../../component/layout/UserMenu';

const Dashboard = () => {
  return (
    <>
      <Layout title='dashboard'>
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className="col-md-9">
              <h4>User Dashboard</h4>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default Dashboard;