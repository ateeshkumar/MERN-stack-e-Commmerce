import React from 'react'
import Layout from '../component/layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values,setValues] = useSearch();
  return (
    <>
      <Layout title='search'>
        <div className="container">
            <div className="text-center">
                <h1>Search Results</h1>
                <h6>{values?.results.length<1 ? 'No Product Found':`Found ${values?.results.length}`}</h6>
                <div className="d-flex flex-wrap">
              {values.results?.map((item) => (
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
                      <button class="btn btn-secondary ms-1">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </>
              ))}
              </div>
            </div>
        </div>
      </Layout>
    </>
  )
}

export default Search
