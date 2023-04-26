
import './App.css';
import { AddUpdateProduct } from './components/product/AddUpdateProduct'
import { useState, useEffect } from 'react';
import { Products } from './components/product/Products';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  Navigate
} from "react-router-dom";
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Header } from './components/common/Header';
import { useSelector, useDispatch } from "react-redux";
import { Footer } from './components/common/Footer'
import { Loader } from './components/common/Loader'
import { ProductDetail } from './components/product/ProductDetail';
import { ProductCart } from './components/product/ProductCart';
import { ProductCheckout } from './components/product/ProductCheckout';
import { Slider } from './components/common/Slider';
import { ProductFeatures } from './components/product/ProductFeatures';
import { About } from './components/about';
import axios from 'axios'
import { allProducts } from "./components/redux/generalSlice/index";
import Toaster from './components/common/Toaster';

function App() {
  const dispatch = useDispatch();
  const api = process.env.REACT_APP_API_KEY

  const [categories, setCategories] = useState(['Cell Phone', 'Accessories'])

  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  console.log(productDetails)

  const tokenUpdate = useSelector((state) => state.isTokenUpdated);
  const isLoading = useSelector((state) => state.isLoading);

  console.log(isLoading, 'is loading')

  const getAllProducts = async () => {
    console.log('ran')
    const token = localStorage.getItem('token')
    const headers = {
      "x-access-token": token
    }
    const res = await axios.get(api + `products/`, {headers})
    console.log(res)
    if (res && res.data.length > 0) {
      // console.log(res)
      dispatch(allProducts(res.data))
    }
    else {
      // setProducts(null)
      console.log(res)
    }

  }

  useEffect(() => {
    setisLoggedIn(tokenUpdate)
    console.log(isLoggedIn, 'token update')
  }, [tokenUpdate])

  useEffect(() => {
    getAllProducts()

  }, [])
  

  return (
    <Router>
      {isLoading ? <Loader /> : ''}
      <div className={`App${isLoading ? ' loading-style' : ''}`} style={{marginTop: '130px'}}>
        <Header />
        <Routes>
          <Route
            path="/login"
            exact
            element={
              !isLoggedIn ?
                <Login />
                :
                <Navigate replace to={"/"} />
            }
          />
          <Route
            path="/register"
            exact
            element={
              !isLoggedIn ?
                <Register />
                :
                <Navigate replace to={"/"} />
            }
          />
          
          <Route
            path="/"
            element={
                <>
                  <Slider />
                  <ProductFeatures />
                  <Products/>
                </>
            }
          />
          
          <Route
            path="/product-details"
            element={
                <ProductDetail/>
            }
          />

          <Route
            path="/create-update"
            element={
              isLoggedIn ?
                <AddUpdateProduct/>
                :
                <Navigate replace to={"/login"} />
            }
          />
          <Route
            path="/cart"
            element={
                <ProductCart/>
            }
          />
          <Route
            path="/checkout"
            element={
              isLoggedIn ?
                <ProductCheckout/>
                :
                <Navigate replace to={"/login"} />
            }
          />

          <Route
            path="/about"
            element={<About/>}
          />
        </Routes>
        <Toaster/>
        {/* { isLoggedIn ? <Footer/> : null} */}
      </div>
    </Router>
  );
}

export default App;
