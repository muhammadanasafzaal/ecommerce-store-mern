import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { isLoading, response } from "../redux/generalSlice";

export const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const api = process.env.REACT_APP_API_KEY

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(null)
    const [avatar, setAvatar] = useState('')

    const submit = async (e) => {
        e.preventDefault();

        let formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('avatar', avatar)

        if (!name || !email || !password) {
          return (alert('Please provide all details'))
        }

        let headers = {
          "Content-Type": "multipart/form-data"
        }

        dispatch(isLoading(true))
        const res = await axios.post(api+'auth/register',formData, headers)
            if(res.data.status_code !== 400){
                dispatch(isLoading(false))
                dispatch(response({message: res.data.message, type: 'success'}))
                setTimeout(() => {
                    navigate('/login')
                }, 3000);
            }
            else{
                dispatch(isLoading(false))
                dispatch(response({message: 'Something went wrong', type: 'error'}))
            }
        // }
        // else {
        //     dispatch(isLoading(false))
        //     console.log('hit3')
        //     alert(res.message)
        // }
        
    }


    return (
        <div className='mt-100'>
            <div className="container">
                <div className="row">
                    <div className="col-4 offset-md-4 border p-4 mt-4">
                        <form onSubmit={submit}>
                            <h4 className="mb-4 border p-2 text-center">Register</h4>
                            
                            <div className="form-group text-left">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" className="form-control" id="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="email">Email address</label>
                                <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" className="form-control" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="formFile" className="form-label">Avatar</label>
                                <input
                                    className="form-control"
                                    id="fileupload"
                                    type="file"
                                    name="image"
                                    onChange={(e)=> setAvatar(e.target.files[0])}
                                />
                            </div>
                            <span className='d-block text-center mt-4' style={{width:'100%'}}>
                                <button type="submit" className="btn btn-dark">Submit</button>
                            </span>
                        </form>
                        <p className='mb-0 mt-2 text-center'>
                            Already registered ? Login  
                            <NavLink className="nav-link d-inline p-0 underline" style={{textDecoration:'underline'}} to="/login"> here</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
