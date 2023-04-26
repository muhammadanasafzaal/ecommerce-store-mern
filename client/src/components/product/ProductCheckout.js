import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetCart, response } from "../redux/generalSlice";
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios';

export const ProductCheckout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let cartItems = useSelector((state) => state.cartItems);
    
    const api = process.env.REACT_APP_API_KEY

    const [name, setName] = useState('')
    const [email, setEmail] = useState()
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [postal, setPostal] = useState(0)
    const [cardNum, setCardNum] = useState('')
    const [expiredate, setExpiredate] = useState(new Date())
    const [cvv, setCvv] = useState('000')

    const checkOut = async (e) => {
        e.preventDefault()
        let data = {
            amountPaid: cartItems[cartItems.length-1].totalAmount,
            billingName: name,
            billingEmail: email,
            billingCountry: country,
            billingState: state,
            billingPostal: postal,
            cardNumber: cardNum, 
            cardExpireDate: expiredate,
            cardCvv: cvv,
            products: cartItems
        }
        console.log(data)
        
            const headers = {
                "Content-Type": "application/json"
            }
            const res = await axios.post(api+'payment/createPayment', data, headers)
            console.log(res)
            if(res){
                if(res.data){
                    if(res.data.status_code === 200){
                        dispatch(response({message: res.data.message, type: 'success'}))
                        setTimeout(() => {
                            navigate('/')
                            dispatch(resetCart())
                        },3000);
                    }
                    else{
                        dispatch(response({message: res.data.error, type: 'error'}))
                    }
                }
                else{
                    dispatch(response({message: res.error, type: 'error'}))
                }
            }
            else{
                dispatch(response({message: 'Provide all fields', type: 'error'}))
            }
        
    }
    
    return (
        <div className='mt-100 mb-5'>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 border p-4 mt-4">
                        <h4 className='mb-4'>Billing Details</h4>
                        <form onSubmit={checkOut}>
                            <div className='text-left'>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={(e)=> setName(e.target.value) }/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email"  onChange={(e)=> setEmail(e.target.value) }/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" className="form-control" id="country" placeholder="Enter country"  onChange={(e)=> setCountry(e.target.value) }/>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <label htmlFor="state">State</label>
                                        <input type="text" className="form-control" placeholder="Enter state"  onChange={(e)=> setState(e.target.value) }/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="postal">Postal Code</label>
                                        <input type="number" className="form-control" placeholder="Enter postal" onChange={(e)=> setPostal(e.target.value) } />
                                    </div>
                                </div>
                            </div>
                            <h4 className='mt-5 mb-4'>Payment Method</h4>
                            <div className='text-left'>
                                <div className="form-group">
                                    <label htmlFor="cardno">Card Number</label>
                                    <input type="number" className="form-control" id="cardno" placeholder="Enter card num" onChange={(e)=> setCardNum(e.target.value) }/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="expiredate">Expiration Date</label>
                                    <input type="date" className="form-control" id="expiredate" placeholder="Enter expiredate" onChange={(e)=> setExpiredate(e.target.value) }/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">CVV</label>
                                    <input type="number" className="form-control" id="country" placeholder="Enter CVV" onChange={(e)=> setCvv(e.target.value) }/>
                                </div>
                            </div>
                            <button type="submit" className="mt-4 btn btn-sm btn-dark">Place Order</button>
                        </form>
                    </div>
                    <div className="col-md-4 offset-md-1 border p-4 mt-4">
                        <h4>Cart Summary</h4>
                        {
                            cartItems && cartItems.map((item,index)=> {
                                if(index !== cartItems.length-1){
                                    return <div className='border text-left p-3' key={index}>
                                        <img src={api+item.image} style={{width:60, height:60}} className="img-fluid" alt="" />
                                        <p>{item.title}</p>
                                        <small>{item.description}</small>
                                    </div>
                                    
                                }

                            })
                        }
                        <div>
                            <h5 className='text-dark mt-4'>Total: Rs. {cartItems[cartItems.length-1].totalAmount}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
