import React, { useState } from 'react'
import { useParams, useLocation, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { addProductToCart } from "../redux/generalSlice";
import { response } from "../redux/generalSlice";

export const ProductDetail = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(0)

    const api = process.env.REACT_APP_API_KEY
    const isLoggedIn = useSelector((state) => state.isTokenUpdated);
    
    console.log(state)

    const editProduct = (product) => {
        console.log(product)
        let data = {
            isEdited: true,
            data: product
        }
        navigate('/create-update', { state: data })
    }

    const addToCart = (product) => {
        console.log(product)
        if(quantity !== 0){
            let data = product
            data['quantity'] = Number(quantity)
            data['total'] = data.price*Number(quantity)
            dispatch(addProductToCart(data))
            dispatch(response({message: 'Added to cart', type: 'success'}))
            setQuantity(0)
        }
    }

    const deleteProduct = async (id) => {
        if (id) {
            const res = await axios.delete(api + `products/delete/${id}`)
            if (res.status === 200 || res.status === 201) {
                dispatch(response({message: 'Product deleted successfully', type: 'success'}))
                setTimeout(() => {
                    navigate('/')  
                }, 2000);
                
            }
            else {
                dispatch(response({message: 'An error occurred', type: 'error'}))
            }
        }
    }

    return (
        <div className='mt-100 mb-5'>
            <div className="container">
            <nav aria-label="breadcrumb" className='mt-2'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                    <li className="breadcrumb-item active nav-link" aria-current="page">Product Detail</li>
                </ol>
            </nav>
                <div className="row">
                    {
                        state != null ?
                            <>
                                <div className="col-md-6 py-4 text-center">
                                    <div className='border py-4'>
                                        <img src={api + state.image} alt="" className='img-fluid'/>
                                    </div>
                                </div>
                                <div className="col-md-4 pt-4">
                                    <div className='mt-4 text-md-left text-center'>
                                        <h5>{state.title}</h5>
                                        {
                                            state.price ? 
                                            <h5 style={{ color: '#4c4c4c' , fontWeight: 'bold' }}> Rs. {state.price}</h5>
                                            : 
                                            <h6 className='text-danger'> Out of stock</h6>
                                        }
                                        
                                        <p>
                                            <span className="badge badge-secondary">{state.category}</span>
                                        </p>
                                        
                                        <p className="mb-0">
                                            {state.description}
                                        </p>
                                        {
                                            state.price ? 
                                            <div>
                                                <input style={{width:'20%'}} className='form-control d-inline-block mr-2' type="number" min="1" onChange={(e)=> setQuantity(e.target.value)}/>
                                                <button disabled={quantity === 0} className='mt-4 py-2 btn-dark btm-sm' onClick={() => addToCart(state)}>Add to Cart</button>
                                            </div>
                                            : 
                                            null
                                        }
                                        
                                        {
                                            isLoggedIn &&
                                            <div className='mt-2'>
                                                <button className='btn-sm mt-2 mr-1 py-2 btn-dark' onClick={() => editProduct(state)}>Update Product</button>
                                                <button className='btn-sm mt-2 mr-1 py-2 btn-dark' onClick={() => deleteProduct(state.p_id)}>Delete Product</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </>
                            :
                            ''
                    }
                </div>
            </div>
        </div>
    )
}
