import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/Layout'

import toast from 'react-hot-toast';
import axios from 'axios';
import {Checkbox,Radio} from 'antd'
import Prices from '../component/Prices';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();
  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [page,setPage] = useState(1);
  const [total,setTotal] = useState(0);
  const [loding,setLoding] = useState(false);

  const getTotal = async()=>{
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total)
    } catch (error) {
      console.log(error);
    }
  }

  const getAllProduct = async()=>{
    try {
      setLoding(true);
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/product/product-list/${page}`
        );
        setLoding(false)
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

  const loadMore = async()=>{
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setProducts([...products,...data?.products])
    } catch (error) {
      console.log(error);
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
  const productFilter=async()=>{
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",{checked,radio}
      );
      setProducts(data?.products)

    } catch (error) {
      console.log(error);
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
    if(!checked.length || !radio.length){
      getAllProduct();
      getAllCategory();
      getTotal();
    }    
   //eslint-disable-next-line
  },[checked.length,radio.length]);
  useEffect(()=>{
    if (checked.length || radio.length) {
      productFilter();
      getAllCategory();
      getTotal();
    }  
  },[checked,radio]);

  useEffect(()=>{
    if(page===1)return;
    loadMore();
  },[page])
  return (
    <div>
      <Layout title="home">
        <div className="row mt-3">
          <div className="col-md-3">
            <h3 className="text-center">Filter by Category</h3>
            <div className="d-flex flex-column m-5">
              {categories?.map((item) => (
                <Checkbox
                  key={item._id}
                  onChange={(e) => handleFilter(e.target.checked, item._id)}
                  className="p-1"
                >
                  {item.name}
                </Checkbox>
              ))}
            </div>
            <h3 className="text-center">Filter by Price</h3>
            <div className="d-flex flex-column m-5">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((name) => (
                  <div key={name._id}>
                    <Radio value={name.array}>{name.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column m-5">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-9">
            
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((item) => (
                <>
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                      className="card-img-top"
                      alt={item.photo}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        {item.description.substring(0, 50)}
                      </p>
                      <p className="card-text">{`Rs: ${item.price}`}</p>
                      <button class="btn btn-primary ms-1" onClick={()=>navigate(`/product/${item.slug}`)}>SEE DETAILS</button>
                      <button class="btn btn-secondary ms-1">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length<total &&(
                <button className='btn btn-warning'
                onClick={(e)=>{e.preventDefault();
                setPage(page+1)}}>{loding?'Loding...':'Loadmore'}</button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
export default HomePage
