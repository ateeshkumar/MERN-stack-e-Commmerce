import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const [title,setTitle] = useState('Product Details');
    const [products,setProducts] = useState({});
    const [relatedProducts,setRelatedProduct] = useState([]);
    const {slug} = useParams();

  const relatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

    const productDetails = async()=>{
        try {
            const { data } = await axios.get(
              `http://localhost:8080/api/v1/product/all-product/${slug}`
            );
            setProducts(data?.products);
            relatedProduct(data?.products?._id,data?.products?.category?._id)
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(()=>{
        if (slug) {
            productDetails();
        }
    },[slug])
  return (
    <>
      <Layout title={products.name}>
        <div className="row container">
          <div className="col-md-6">
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${products._id}`}
              className="card-img-top"
              alt={products.photo}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Product Details</h1>
            <h4>Name: {products.name}</h4>
            <h4>Description: {products.description}</h4>
            <h4>Price: Rs {products.price}</h4>
            <h4>Category: {products?.category?.name}</h4>
            <h4>Shipping: {products.shipping}</h4>
            <button class="btn btn-secondary ms-1">ADD TO CART</button>
          </div>
        </div>
        <div className="row container">
          <h4>Simmiler Products</h4>
          {relatedProducts.length<1 && <p className='text-center'>No Simmiler Product Found!!</p>}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((item) => (
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
                    <button class="btn btn-primary ms-1">SEE DETAILS</button>
                    <button class="btn btn-secondary ms-1">ADD TO CART</button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ProductDetails
