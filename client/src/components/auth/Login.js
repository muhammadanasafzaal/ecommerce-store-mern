import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { tokenUpdate, isLoading, response } from "../redux/generalSlice";


export const Login = () => {
    const api = process.env.REACT_APP_API_KEY
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(null)

    // const token = localStorage.getItem('token')

    const submit = async (e) => {
        e.preventDefault();
        let data = {
            email: email,
            password: password
        }
        if (data) {
            const headers = {
                "Content-Type": "application/json"
            }

            dispatch(isLoading(true))
            const res = await axios.post(api + "auth/login", data, headers)

            if (res.data.status_code === 200) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.data))
                dispatch(isLoading(false))
                dispatch(response({message: res.data.message, type: 'success'}))
                setTimeout(() => {
                    dispatch(tokenUpdate(true))
                }, 3000);
            }
            else {
                dispatch(isLoading(false))
                dispatch(response({message: res.data.message, type: 'error'}))
            }
        }
        else {
            dispatch(isLoading(false))
            dispatch(response({message: 'Please provide all the values', type: 'error'}))
        }
    }

    // const fun = () => {
    //     toast('🦄 Wow so easy!');
    // }


    return (
        <div className='mt-100'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 col-sm-6 offset-md-4 border p-4 mt-4">
                        <form onSubmit={submit}>
                            <h4 className="mb-4 border p-2 text-center">Login</h4>
                            <div className="form-group text-left">
                                <label htmlFor="email">Email address</label>
                                <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" className="form-control" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <span className='d-block text-center mt-4' style={{width:'100%'}}>
                                <button type="submit" className="btn btn-dark">Submit</button>
                            </span>
                        </form>
                        <p className='mb-0 mt-2 text-center'>
                            Not a user? Register 
                            <NavLink className="nav-link d-inline p-0 underline" style={{textDecoration:'underline'}} to="/register" > here</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
