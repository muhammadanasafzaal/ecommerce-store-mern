import Product from '../models/product.js'
import jwt from 'jsonwebtoken'

export const fetchProducts = async (req, res) => {
    const token = req.headers['x-access-token']
    // console.log(token)
    try {
        if(token){
            const decoded = jwt.verify(token,'secretkey1234')
            if(decoded){
                const products = await Product.find()
                // console.log(products , 'products')
                res.status(200).json(products);
            }
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const fetchProductsByCategory = async (req, res) => {
    try {   
        const { category } = req.body
        const products = await Product.find({ category: category })
        res.send(products);
        // console.log(req.body, 'category')/
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const fetchProductById = async (req, res) => {
    try {   
        const { id } = req.params
        const product = await Product.find({ p_id: id })
        res.send(product);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createProduct = async (req, res) => {
    try {
        const products = await Product.find();    
        const lastProduct = products[products.length - 1]
        const { title, category, price, description } = req.body;
        const image = req.file.path

        // console.log(image)

        if (!title || !category || !price ) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        else{
            const newProduct = new Product({
                p_id: lastProduct != null && lastProduct.p_id != null ? lastProduct.p_id + 1 : 1,
                title: title,
                category: category,
                description: description,
                price: price,
                image: image
            })
            const saveProduct = await newProduct.save();
            res.status(201).json(saveProduct);
        }
    } 
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { p_id, title, category, price, description, image} = req.body;
        console.log(req.body, 'body')

        // const validBody = Object.values(req.body).every(val => val != null || val != undefined)
        if (!p_id || !title || !category || !price) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        else{
           const updateProduct = await Product.findOneAndUpdate({p_id: p_id}, {$set:{title:title, category: category, description: description, price: price, image: image}}, {new: true});
            res.status(200).json(updateProduct)
        }
    } 
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        else{
           const deleteProduct = await Product.findOneAndDelete({p_id: id});
            res.status(200).json(deleteProduct)
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
