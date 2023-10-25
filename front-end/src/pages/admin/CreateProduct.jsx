import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateProduct = () => {
  const [product , setProduct] = useState([]);
  const [category , setCategory] = useState([]);
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');
  const [cat,setCat] = useState('');
  const [quantity,setQuantity] = useState('');
  const [photo,setPhoto] = useState('');
  const [shipping,setShipping] = useState('');
  const getAllProduct = async() =>{
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/product/all-product');
      if(data?.success){
        toast.success(data?.massage);
        setProduct(data?.products);
      }else{
        toast.error(data?.error);
      }
    } catch (error) {
      toast.error('Something Error in get product');
    }
  }
  const getAllcategory = async()=>{
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/category/all-category');
      if(data?.success){
        setCategory(data.category);
      }
    } catch (error) {
      toast.error('Something went wrong in getting category');
    }
  }
  const handleCreate = async(e)=>{
    e.preventDefault();
    try {
      // const productData = new FormData();
      // productData.append(name);
      // productData.append(description);
      // productData.append(price);
      // productData.append(photo);
      // productData.append(cat);
      // productData.append(quantity);
      // productData.append(shipping);
      const {data} = await axios.post('http://localhost:8080/api/v1/product/create-product',{
        name:name,
        description:description,
        price:price,
        photo:photo,
        category:cat,
        quantity:quantity,
        shipping:shipping,
      });
      if(data?.success){
        toast.success(data?.massage);
        getAllProduct();
      }else{
        toast.error(data?.massage);
      }
    } catch (error) {
      toast.error('Something went wrong in create post');
    }
  }
  useEffect(()=>{
    getAllProduct();
    getAllcategory();
    //eslint-disable-next-line
  },[]);
  return (
    <>
      <Layout title='create product'>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
                <h4>Manage Product</h4>
                <div className="m-1 w-75">
                  <select
                    placeholder='Select a category'
                    size='large'
                    className='form-select mb-3'
                    onChange={(value)=>setCat(value)}>
                      {
                        category?.map((item)=>(
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))
                      }

                  </select>
                  <div className="mb-3">
                    <label
                    className='btn btn-outline-secondary col-md-12'>
                      {photo? photo.name:'Upload Photo'} 
                      <input type="file"
                      name='photo'
                      accept='image/*'
                      onChange={(e)=>setPhoto(e.target.files[0])}
                      hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt={photo.name}
                        height={'150px'}
                        className='img img-responsive'/>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <input type="text" 
                    value={name}
                    placeholder='Write a product name'
                    className='form-control'
                    onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <textarea type="text" 
                    value={description}
                    placeholder='Write a product Description'
                    className='form-control'
                    onChange={(e)=>setDescription(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <input type="text" 
                    value={price}
                    placeholder='Write a product Price'
                    className='form-control'
                    onChange={(e)=>setPrice(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <input type="text" 
                    value={quantity}
                    placeholder='Write a product Quantity'
                    className='form-control'
                    onChange={(e)=>setQuantity(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <select
                    placeholder='select shipping'
                    size='large'
                    className='form-select mb-3'
                    onChange={(value)=>{setShipping(value)}}>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div className='mb-3'>
                    <button className='btn btn-primary'
                    onClick={handleCreate}>
                      Create Product
                    </button>
                  </div>
                </div>
                <div>
                  <table className="table w-75 table-hover">
                   <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.map((item)=>(
                        <tr>
                          <td key={item._id}>{item.name}</td>
                          <td>
                            <button className='btn btn-primary ms-2'>Edit</button>
                            <button className='btn btn-danger ms-2'>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CreateProduct
