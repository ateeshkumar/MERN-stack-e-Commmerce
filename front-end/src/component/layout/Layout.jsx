import React from 'react'
import './css/layout.css';
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';
const Layout = ({children,title,description,keyword,author}) => {
  return (
    <div className='layout-container'>
      <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description}/>
          <meta name="keywords" content={keyword}/>
          <meta name="author" content={author}/>
          <title>{title}</title>
      </Helmet>
        <Toaster />
        <Header/>
      {children}
      <Footer/>
    </div>
  )
}
Layout.defaultProps = {
  title: 'Ecommerce app - Shop now',
  description: 'Mern stack development',
  keyword: 'mern,react,node,mongodb',
  author: 'e-commarce'
}

export default Layout
