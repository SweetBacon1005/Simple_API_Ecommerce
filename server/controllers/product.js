const Product = require('../schemas/Product');
class ProductController {
    async create(req, res) {
        const {name, price, category, description} = req.body;
        if (!name || !price || !category || !description) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            })
        }
        try {
            const product = await Product
                .findOne({name})
                .populate('category')
            if (product) {
                return res.status(400).json({
                    success: false,
                    message: 'Product already exists',
                })
            }
            const newProduct = new Product({
                name,
                price,
                category,
                description,
            })

            await newProduct.save();
            return res.status(200).json({
                success: true,
                message: 'Product created successfully',
                product: newProduct,
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            })
        }
    }
    async getAll(req, res) {
        try {
            const products = await Product
                .find()
                .populate('category')
            return res.status(200).json({
                success: true,
                products,
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            })
        }
    }
    async getById(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Missing product ID',
            })
        }
        try {
            const product = await Product
                .findById(id)
                .populate('category')
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found',
                })
            }
            return res.status(200).json({
                success: true,
                product,
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            })
        }
    }
}
module.exports = new ProductController();