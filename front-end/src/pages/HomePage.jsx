import React from 'react'
import Layout from '../component/layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth,setAuth]  = useAuth();
  return (
    <div>
      <Layout title='home'>
        <h1>Home page</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
      </Layout>
    </div>
  )
}

export default HomePage
