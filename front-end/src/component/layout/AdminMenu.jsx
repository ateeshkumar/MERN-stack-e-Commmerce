import React from 'react'
import { Link } from 'react-router-dom'
const AdminMenu = () => {
  return (
    <>
      <div className="list-group">
        <h4>Admin Panel</h4>
        <Link to='/dashboard/admin/create-category' className="list-group-item">Create Category</Link>
        <Link to='/dashboard/admin/create-product' className="list-group-item">Create Product</Link>
        <Link to='/dashboard/admin/users' className="list-group-item">Users</Link>
        <Link to='/dashboard/admin/products' className="list-group-item">Products</Link>
      </div>

    </>
  )
}

export default AdminMenu
