const Product = require('../models/Product');
class ProductController {
    async create(req, res) {
        const { name, price } = req.body;
        if(!name || !price){
            return res.status(400).json({
                success: false,
                message: 'Name and price are required'
            })
        }
        try{
            const product = await Product.findOne({name});
            if(product){
                return res.status(400).json({
                    success: false,
                    message: 'Product already exists'
                })
            }
            const newProduct = new Product({name, price});
            await newProduct.save();
            return res.status(201).json({
                success: true,
                message: 'Product created'
            })
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: err.message
            })
        }
    }
    async getAll(req, res) {
        try{
            const products = await Product.find();
            return res.status(200).json({
                success: true,
                products
            })
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: err.message
            })
        }
    }
    async getById(req, res) {
        const { id } = req.params;
        try{
            const product = await Product.findById(id);
            if(!product){
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                })
            }
            return res.status(200).json({
                success: true,
                product
            })
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: err.message
            })
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const { name, price } = req.body;
        if(!name || !price){
            return res.status(400).json({
                success: false,
                message: 'Name and price are required'
            })
        }
        try{
            const product = await Product.findById(id);
            if(!product){
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                })
            }
            product.name = name;
            product.price = price;
            await product.save();
            return res.status(200).json({
                success: true,
                message: 'Product updated'
            })
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: err.message
            })
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try{
            const product = await
            Product.findByIdAndDelete(id);
            if(!product){
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                })
            }
            return res.status(200).json({
                success: true,
                message: 'Product deleted'
            })
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: err.message
            })
        }
    }
}
module.exports = new ProductController();