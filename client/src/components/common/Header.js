import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { isLoading, tokenUpdate, response } from '../redux/generalSlice/index'
import logo from '../../assets/logo.svg'

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.allProducts);
    console.log(allProducts)
    const [searchQuery, setSearchQuery] = useState()
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    console.log(user)
    // const [products, setProducts] = useState([
    //     {
    //         label: 'product 1',
    //     },
    //     {
    //         label: 'product 2',
    //     },
    // ])
    
    const searchProducts = (query) => {
        console.log(query)
        console.log(allProducts)
        if(!query){
            setSearchQuery(null)    
        }
        else{
            let allprd = allProducts
            let res = allprd.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
            setSearchQuery(res)
        }
    }

    const logOut = () => {
        localStorage.clear();
        // localStorage.removeItem('token')
        dispatch(tokenUpdate(false))
        dispatch(response({message: 'Logged out', type: 'success'}))
        navigate('/login')
    }

    const [isLoggedIn, setisLoggedIn] = useState(false)
    const cartItems = useSelector((state) => state.cartItems);
    const token = useSelector((state) => state.isTokenUpdated);
    useEffect(() => {
        setisLoggedIn(token ? token : null)
        // console.log(JSON.parse(localStorage.getItem('user')), 'token update')
    }, [token])

    const viewProductDetails = (product) => {
        console.log(product)
        navigate('/product-details', { state: product })
    }

    return (
        <div className='header bg-light'>
            <div className='container'>
                <div className="row">
                    <div className="col-12">

                        <nav className="navbar navbar-expand-lg navbar-dark ">
                            <NavLink className="navbar-brand nav-link" to="/">
                                <img src={logo} alt="" width="120" />
                            </NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" style={{justifyContent:'flex-end'}} id="navbarSupportedContent">
                                <form className="form-inline my-2 my-lg-0 search-filter">
                                    <div className='search-query'>
                                        <input className="form-control mr-sm-2" type="text" placeholder="search products" onChange={(e)=> {searchProducts(e.target.value)} } />
                                        <ul style={{display: searchQuery ? 'block' : 'none' }}>
                                            {searchQuery && searchQuery.map((item,index)=> {
                                                return <li key={index}>
                                                    <p style={{cursor:'pointer', backgroundColor:'#e2e2e2', zIndex:9, position: 'relative' }} className="nav-link" onClick={() => viewProductDetails(item)}>{item.title}</p>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                    {/* <button className="btn my-2 my-sm-0" type="submit">Search</button> */}
                                </form>
                                <NavLink className="nav-link text-center text-md-left px-1 mt-2" to="/cart">
                                    <span className='position-relative'>
                                        <small className='notification'>{cartItems.length > 0 ? cartItems.length - 1 : 0}</small>
                                        <i className="fa fa-shopping-cart text-dark mr-2" aria-hidden="true" style={{ fontSize: 22 }}></i>
                                    </span>
                                </NavLink>
                                {
                                    isLoggedIn ?
                                        <NavLink className="nav-link text-center text-md-left px-1" to="#" onClick={(e) => { e.preventDefault(); logOut() }}>
                                            {/* <button className='btn-sm btn-dark p-2'> */}
                                            <i className="fa fa-sign-out text-dark mr-2 position-relative" aria-hidden="true" style={{ fontSize: 22, top: '3px' }}></i>
                                            {/* <span className='text-light'>Logout</span> 
                                        </button> */}
                                        </NavLink>
                                        :
                                        <NavLink className="nav-link text-center text-md-left px-1 mt-2" to="/login">
                                            {/* <button className='btn-sm btn-dark p-2'> */}
                                            <i className="fa fa-user text-dark mr-2 position-relative" aria-hidden="true" style={{ fontSize: 22, top: '3px' }}></i>
                                            {/* <span className='text-light'>Login</span> 
                                        </button> */}
                                        </NavLink>
                                }

                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0 nav-menu">
                <div className="row">
                    <div className="col-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <nav className="navbar navbar-expand-lg navbar-dark ">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>

                                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                            <ul className="navbar-nav mr-auto text-md-left text-center">
                                                <li className="nav-item active mt-md-2 mt-4 mb-2">
                                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                                </li>
                                                <li className="nav-item active mt-md-2 mt-4 mb-2">
                                                    <NavLink className="nav-link" to="/about">About</NavLink>
                                                </li>
                                                <li className="nav-item active mt-md-2 mt-4 mb-2">
                                                    <NavLink className="nav-link" to="/">Contact</NavLink>
                                                </li>
                                                {
                                                    isLoggedIn && (user && user.name == 'admin') ?
                                                        <li className="nav-item mt-md-2 mb-2">
                                                            <NavLink className="nav-link" to="/create-update">Add Product</NavLink>
                                                        </li>
                                                        :
                                                        ''
                                                }
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
