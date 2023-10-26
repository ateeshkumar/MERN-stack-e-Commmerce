import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/Layout'

import toast from 'react-hot-toast';
import axios from 'axios';
import {Checkbox} from 'antd'
const HomePage = () => {
  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const getAllProduct = async()=>{
    try {
        const {data} = await axios.get('http://localhost:8080/api/v1/product/all-product');
            if(data?.success){
                // toast.success(data?.massage);
                setProducts(data?.products)
            }else{
                toast.error(data?.massage);
            }
    } catch (error) {
      // toast.error('something went worng!!')
    }
  }
  const getAllCategory = async()=>{
    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/category/all-category');
      if(data?.success){
        // toast.success(data?.massage);
        setCategories(data?.category);
      }
    } catch (error) {
      // toast.error('Something went wrong in getting category');
    }
  }
  const handleFilter=async(value,id)=>{
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(c => c!== id)
    }
    setChecked(all);
  }
  useEffect(()=>{
      getAllProduct();
      getAllCategory();
      //eslint-disable-next-line
  })
  return (
    <div>
      <Layout title='home'>
        <div className="row mt-3">
          <div className="col-md-3">
            <h3 className='text-center'>Filter by Category</h3>
            <div className="d-flex flex-column m-5">
              {
                categories?.map((item)=>(
                  <Checkbox key={item._id} onChange={(e)=>handleFilter(e.target.checked,item._id)} className='p-1'>
                    {item.name}
                  </Checkbox>
                ))
              }
            </div>
          </div>
          <div className="col-md-9">
            {JSON.stringify(checked,null,4)}
            <h1 className="text-center">
              All Products
            </h1>
            <div className="d-flex flex-wrap">
              {
                products?.map((item)=>(
                  <>        
                    <div className="card m-2" style={{ width: "18rem" }}>
                        <img src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt={item.photo} />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                              <p className="card-text">
                                {item.description}
                              </p>
                              <button class="btn btn-primary ms-1">SEE DETAILS</button>
                              <button class="btn btn-secondary ms-1">ADD TO CART</button>
                          </div>
                        </div>
                      
                  </>
                        ))
                    }
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default HomePage
