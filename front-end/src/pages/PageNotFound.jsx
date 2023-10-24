import React from 'react'
import Layout from '../component/layout/Layout'
import './css/pagenotfound.css';
const PageNotFound = () => {
  
  return (
    <>
    <Layout title='page not found'>
      <div className="pnf">
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
      </div>
    </Layout>

      
    </>
  )
}

export default PageNotFound
