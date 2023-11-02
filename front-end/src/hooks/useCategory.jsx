import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useCategory = () => {
    const [category,setCategory] = useState([]);

   const getCategory= async()=>{
    try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/category/all-category"
        );
        setCategory(data?.category);

    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    getCategory();
    //eslint-disable-next-line
  },[])
  return category;
}

export default useCategory
