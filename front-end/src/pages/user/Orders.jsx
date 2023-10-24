import React from 'react'
import Layout from '../../component/layout/Layout'
import UserMenu from '../../component/layout/UserMenu'

const Orders = () => {
  return (
    <>
      <Layout title='user-orders'>
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className="col-md-9">
              <h4>All Orders</h4>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Orders
