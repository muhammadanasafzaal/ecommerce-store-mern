import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Product.css'
import { Product } from './Product'


export const Products = () => {
    const [categories, setCategories] = useState(['Cell Phones', 'Accessories', 'Graphic Cards', 'Laptops', 'Gaming Consoles'])

    return (
        <div>
            <div className="container">
                <div className="row">
                    {/* <div className="col-12 text-left">
                        <h4>Browse by Category</h4>
                    </div> */}
                    {
                        categories.map((item, index) => {
                            return <div className="col-md-12 mb-4" key={index}>
                                <Product category={item} />
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
