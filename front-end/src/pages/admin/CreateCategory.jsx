import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryFrom from '../../component/form/CategoryFrom';
import { Button, Modal } from 'antd';
const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name,setName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected,setSelected] = useState(null);
  const [updated,setUpdated] = useState('');

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
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:8080/api/v1/category/create-cetegory',{name});
      if(data?.success){
        toast.success(data?.massage);
        getAllcategory();
      }else{
        toast.error(data?.massage);
      }
    } catch (error) {
      toast.error('Something went wrong in create category');
    }
  }
  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,{name:updated});
      if(data?.success){
        toast.success(data?.massage);
        setSelected(null);
        setUpdated('');
        setIsModalOpen(false);
        getAllcategory();
      }else{
        toast.success(data?.massage);
      }
    } catch (error) {
      toast.error('Something went wrong in update massage');
    }
  }
  const handleDelete = async(slug)=>{
    try {
      const {data} = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${slug}`);
      if(data?.success){
        toast.success(data?.massage);
        getAllcategory();
      }else{
        toast.success(data?.massage);
      }
    } catch (error) {
      toast.error('Something went wrong in update massage');
    }
  }
  useEffect(()=>{
    getAllcategory();
     //eslint-disable-next-line
  },[])
  return (
    <>
      <Layout title='create category'>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
             
               <h4>Manage Category</h4>
               <div className="p-3 w-75">
                <CategoryFrom handleSubmit={handleSubmit} value={name} setValue={setName}/>
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
                      
                        {category?.map((item)=>(
                          <tr>
                            <td key={item._id}>{item.name}</td>
                           
                            <td >
                              <button className='btn btn-primary ms-2' onClick={()=>{setIsModalOpen(true); setUpdated(item.name); setSelected(item)}}>Edit</button>
                              <button className='btn btn-danger ms-2' onClick={()=>handleDelete(item.slug)}>Delete</button>
                            </td>
                            
                          </tr>
                        ))}
                    </tbody>
                </table>
              </div>
              <Modal onCancel={()=>setIsModalOpen(false)} footer={null} open={isModalOpen}>
                <CategoryFrom handleSubmit={handleUpdate} value={updated} setValue={setUpdated}/>
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default CreateCategory
