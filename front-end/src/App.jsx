import {Routes,Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Contact from './pages/Contact'
import About from './pages/About'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/user/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import PrivateRoute from './component/route/PrivateRoute'
import FrogotPasword from './pages/auth/FrogotPasword'
import AdminRoute from './component/route/AdminRoute'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProduct from './pages/admin/CreateProduct'
import Users from './pages/admin/Users'
import Profiles from './pages/user/Profiles'
import Orders from './pages/user/Orders'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>}/>
          <Route path='user/profile' element={<Profiles/>}/>
          <Route path='user/orders' element={<Orders/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/create-category' element={<CreateCategory/>}/>
          <Route path='admin/create-product' element={<CreateProduct/>}/>
          <Route path='admin/users' element={<Users/>}/>
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<FrogotPasword/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/policy' element= {<Policy/>}/>
        <Route path='/*' element= {<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
