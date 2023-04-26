import React from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteProductFromCart, response  } from "../redux/generalSlice";
import { useNavigate, useLocation } from "react-router-dom";

export const ProductCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    let cartItems = useSelector((state) => state.cartItems);
    console.log(cartItems)

    const deleteFromCart = (prdIndex) => {
        dispatch(deleteProductFromCart(prdIndex))
        dispatch(response({message: 'Removed from cart', type: 'success'}))
    }

    return (
        <div className='mt-100 mb-5'>
            <div className="container-fluid mt-4">
                {
                    cartItems && cartItems.length > 1 ?
                        <div className="row">
                            <div className="col-12 col-sm-9 col-md-9">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price(Rs.)</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total(Rs.)</th>
                                            <th scope='col'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems ?
                                                cartItems.map((item, index) => {
                                                    {
                                                        if (index != cartItems.length - 1) {
                                                            return <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.title}</td>
                                                                <td>{item.price}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>{item.total}</td>
                                                                <td>
                                                                    <i className='fa fa-trash cp' onClick={() => deleteFromCart(index)}></i>
                                                                </td>
                                                            </tr>
                                                        }
                                                    }
                                                })
                                                : ''
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 col-sm-3 col-md-3">
                                <div className='mt-2'>
                                    <div className='d-flex justify-content-between mb-2 border-bottom pb-1'>
                                        <h6> Total Products </h6>
                                        <small> { cartItems.length-1 } </small>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2 border-bottom pb-1'>
                                        <h6> Total Items </h6>
                                        <small> { cartItems[cartItems.length-1].totalQuantity } </small>
                                    </div>
                                    <div className='d-flex justify-content-between mb-2 border-bottom pb-1'>
                                        <h6> Total </h6>
                                        <small> Rs. { cartItems[cartItems.length-1].totalAmount } </small>
                                    </div>
                                </div>
                                <button className='btn-lg btn-dark btn-sm' onClick={()=> navigate('/checkout')}>Proceed to Checkout</button>
                            </div>
                        </div>
                        : 
                        <div style={{marginTop: '100px'}}>
                            No items available
                        </div>
                }
            </div>
        </div>
    )
}
