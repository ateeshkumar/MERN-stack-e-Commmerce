import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/Layout'
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
const Cart = () => {
    const [auth,setAuth] = useAuth();
    const [cart,setCart] = useCart();
    const [total,setTotal] = useState(0);
    const [clientToken,setClinetToken] = useState("")
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getToken = async()=>{
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/product/braintree/token"
        );
        setClinetToken(data?.clientToken)
      } catch (error) {
        console.log(error);
      }
    }

    const totalPrice=()=>{
        try {
            cart.map((item)=>{
                setTotal(total+item.price)
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemove=(id)=>{
        try {
            let mycart = [...cart];
            let index = mycart.findIndex((item)=>item._id===id)
            mycart.splice(index,1);

            setCart(mycart)
            localStorage.setItem('cart',JSON.stringify(mycart));
        } catch (error) {
            console.log(error);
        }
    }
    const handlePayment = async () => {
      try {
        setLoading(true)
        const { nonce } = await instance.requestPaymentMethod();
        const { data } = await axios.post(
          "http://localhost:8080/api/v1/product/braintree/payment",
          {cart,nonce}
        );
        setLoading(false);
        localStorage.removeItem('cart');
        setCart([]);
        navigate("/dashboard/user/orders");
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    useEffect(()=>{
        totalPrice();
        getToken()
    },[auth?.token])
  return (
    <>
      <Layout title="cart">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2">
                {`Hello ${auth?.token && auth?.user?.name}`}
              </h1>
              <h4 className="text-center ">
                {cart?.length > 1
                  ? `You have ${cart.length} items in your cart ${
                      auth.token ? "" : "please Login to checkout"
                    }`
                  : "Your cart is empty"}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {cart.map((item) => (
                <div className="row m-2 card flex-row">
                  <div className="col-md-4">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                      className="card-img-top"
                      alt={item.photo}
                      width={"100px"}
                      height={"150px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>Name: {item.name}</p>
                    <p>Description: {item.description}</p>
                    <p>Price: {item.price} Rs</p>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: Rs {total}</h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    {auth?.user?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/login", { state: "/cart" })}
                      >
                        Please Loging to checkout
                      </button>
                    )}
                  </div>
                </>
              )}
              <div className="mt-2">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      // disabled={!loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default Cart;