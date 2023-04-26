import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useHistory, Routes, Route, Link } from "react-router-dom";
import { decodeToken } from "react-jwt";
import './Product.css'
import { ProductDetail } from './ProductDetail';
import { useDispatch } from "react-redux";
import { allProducts } from "../redux/generalSlice";

export const Product = ({
  category
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [products, setProducts] = useState(null)
  console.log(category)

  const api = process.env.REACT_APP_API_KEY

  useEffect(() => {
    if (category) {
      getProductsByCategory()
    }
  }, [category])


  const getProductsByCategory = async () => {
    console.log(category)
    const headers = {
      "Content-Type": "application/json"
    }
    const res = await axios.post(api + `products/fetchByCategory`, { category }, headers)
    if (res && res.data.length > 0) {
      setProducts(res.data)
      // dispatch(allProducts(res.data))
      // console.log('dispatched')
      // console.log(res)
    }
    else {
      setProducts(null)
      // console.log(products)
    }

  }

  const viewProductDetails = (product) => {
    console.log(product)
    navigate('/product-details', { state: product })
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12 my-4 border bg-dark text-white text-md-left text-center" style={{ borderRadius: '7px' }}>{category}</div>
        {
          (products ? products.map((item, index) => {
            if (index <= 3) {
              return <div className='col-md-3 col-12 mt-md-0 mt-4 text-center' key={index} onClick={() => viewProductDetails(item)}>
                <div className='product p-2' style={{ borderRadius: '5px' }}>
                  <img src={api + item.image} alt="" className='img-fluid product-tile' />
                  <div className='mt-2'>{item.title}</div>
                  {
                    item.price ?
                      <h5 className='mt-2' style={{ color: '#4c4c4c', fontWeight: 'bold' }}> Rs. {item.price}</h5>
                      :
                      <h6 className='mt-2 text-danger'> Out of stock</h6>
                  }
                  {
                    item.description ?
                      <small className='mt-2'> Rs. {item.description.substring(0, 70).concat('...')}</small>
                      :
                      <small className='mt-2'> No description available</small>
                  }

                </div>
              </div>
            }
          })
            : <div className='col-12 text-center'>No products available</div>
          )
        }

      </div>
    </>
  )
}
