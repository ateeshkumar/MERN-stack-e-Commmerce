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
import Product from './pages/admin/Product'
import UpdateProduct from './pages/admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/product/:slug' element={<ProductDetails/>}/>
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
          <Route path='admin/products' element={<Product/>}/>
          <Route path='admin/products/:slug' element={<UpdateProduct/>}/>
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<FrogotPasword/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/policy' element= {<Policy/>}/>
        <Route path='/*' element= {<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
