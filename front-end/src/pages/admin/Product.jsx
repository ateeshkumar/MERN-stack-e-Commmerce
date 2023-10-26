import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Product = () => {
    const [product,setProduct] = useState([]);
    const getAllProduct = async()=>{
        try {
            const {data} = await axios.get('http://localhost:8080/api/v1/product/all-product');
            if(data?.success){
                // toast.success(data?.massage);
                setProduct(data?.products)
            }else{
                toast.error(data?.massage);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    useEffect(()=>{
        getAllProduct();
        //eslint-disable-next-line
    })
  return (
    <>
     <Layout title='Admin-product'>
        <div className="container-fluid m-3 p-3 dashboard">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h4>All product List </h4>
                    <div className="d-flex flex-wrap">
                    {
                        product?.map((item)=>(
                            <>
                            <Link key={item._id} to={`/dashboard/admin/products/${item.slug}`}
                            className='product-link'>
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} className="card-img-top" alt={item.photo} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">
                                    {item.description}
                                    </p>
                                </div>
                            </div>
                            </Link>
                            </>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
     </Layout> 
    </>
  )
}

export default Product
