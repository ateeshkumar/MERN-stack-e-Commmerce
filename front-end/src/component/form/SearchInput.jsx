import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/search';

const SearchInput = () => {
    const navigate =  useNavigate();
    const [values,setValues] = useSearch();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const { data } = await axios.get(
              `http://localhost:8080/api/v1/product/search/${values.keyword}`
            );
            setValues({...values,results:data});
            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
      <form className="d-flex" onSubmit={handleSubmit} role='search'>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e)=>setValues({...values,keyword:e.target.value})}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchInput
