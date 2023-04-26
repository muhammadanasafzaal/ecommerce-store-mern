import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { isLoading } from "../redux/generalSlice";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { response } from "../redux/generalSlice";

export const AddUpdateProduct = () => {
  const api = process.env.REACT_APP_API_KEY
  const dispatch = useDispatch();
  const { state } = useLocation()

  console.log(state)
  const categories = [
    {
      label: 'Cell Phones',
      value: 'Cell Phones'
    },
    {
      label: 'Accessories',
      value: 'Accessories'
    },
    {
      label: 'Graphic Cards',
      value: 'Graphic Cards'
    },
    {
      label: 'Laptops',
      value: 'Laptops'
    },
    {
      label: 'Gaming Consoles',
      value: 'Gaming Consoles'
    },
  ]


  // const [refreshProducts, setRefreshProducts] = useState(true)
  const [isEdited, setIsEdited] = useState(state && state.isEdited ? state.isEdited : false)
  const [id, setId] = useState(state && state.data.p_id ? state.data.p_id : -1)
  const [title, setTitle] = useState(state && state.data.title ? state.data.title : '')
  const [category, setCategory] = useState(state && state.data.category ? state.data.category : '')
  const [description, setDescription] = useState(state && state.data.description ? state.data.description : '')
  const [price, setPrice] = useState(state && state.data.price ? state.data.price : 0)
  const [image, setImage] = useState(state && state.data.image ? state.data.image : undefined)


  const createProduct = async (e) => {
    e.preventDefault();
    console.log(image)
    console.log(category)
    let formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('image', image)
    if (!title || !category || !image || !price) {
      return (alert('Please provide all details'))
    }
    let headers = {
      "Content-Type": "multipart/form-data"
    }

    dispatch(isLoading(true))
    const res = await axios.post(api + 'products/create', formData, { headers })

    if (res.status === 200 || res.status === 201) {
      dispatch(isLoading(false))
      dispatch(response({message: 'Product added successfully', type: 'success'}))
      // setRefreshProducts(true)
      setTitle('')
      setCategory('')
      setPrice(0)
      setImage(undefined)
      setDescription('')
      document.getElementById("fileupload").value = "";
    }
  }


  const updateProduct = async (e) => {
    console.log(image)
    console.log('on update')
    e.preventDefault();
    let formData = new FormData()
    formData.append('p_id', id)
    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('image', image)
    if (!title || !category || !image || !price) {
      return (alert('Please provide all details'))
    }
    let headers = {
      "Content-Type": "multipart/form-data"
    }

    dispatch(isLoading(true))
    const res = await axios.post(api + 'products/update', formData, { headers })

    if (res.status === 200 || res.status === 201) {
      dispatch(isLoading(false))
      dispatch(response({message: 'Product updated successfully', type: 'success'}))
      // setRefreshProducts(true)
      setId(-1)
      setTitle('')
      setCategory('')
      setPrice(0)
      setDescription('')
      document.getElementById("fileupload").value = "";
    }
  }

  const onChangeFile = event => {
    setImage(event.target.files[0])
  };

  return (
    <div className='mt-100 mb-5'>
      <div className="container mb-4">
        <nav aria-label="breadcrumb" className='mt-2'>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="breadcrumb-item active nav-link" aria-current="page">{isEdited ? 'Update' : 'Add'} Product</li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-12 col-sm-3 col-md-4 offset-md-4 border mt-4 p-4">
            <form onSubmit={isEdited ? updateProduct : createProduct} >
              <div className="form-group text-left">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group text-left">
              <label htmlFor="category">Category</label>
                <select className='form-control' value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  {categories.map((item, index) => (
                    <option value={item.value} key={index}>{item.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group text-left">
                <label htmlFor="category">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group text-left">
                <label htmlFor="category">Description</label>
                <textarea
                  type="number"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group mb-3 text-left">
                <label htmlFor="formFile" className="form-label">Image</label>
                <input
                  className="form-control"
                  id="fileupload"
                  type="file"
                  name="image"
                  onChange={onChangeFile}
                />
              </div>
              {(isEdited && image) && <img src={api + image} style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '50%'
              }} />}
              <div className='mt-4'>
                {
                  !isEdited ?
                    <button className="btn btn-dark" type='submit'>Submit</button>
                    :
                    <button className="btn btn-info" type='submit'>Update</button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
