const Category = require('../schemas/Category');
const Product = require('../schemas/Product');
class CategoryController {
    async create(req, res) {
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            })
        }
        try {
            const category = await Category.findOne({name});
            if (category) {
                return res.status(400).json({
                    success: false,
                    message: 'Category already exists',
                })
            }
            const newCategory = new Category({name});
            await newCategory.save();
            return res.status(200).json({
                success: true,
                message: 'Category created successfully',
                category: newCategory,
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
            const categories = await Category.find();
            return res.status(200).json({
                success: true,
                categories,
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
    async getProductsByCategory(req, res) {
        const {id} = req.params;
        try {
            const products = await Product.find({category: id});
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
    async update(req, res) {
        const {id} = req.params;
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            })
        }
        try {
            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found',
                })
            }
            category.name = name;
            await category.save();
            return res.status(200).json({
                success: true,
                message: 'Category updated successfully',
                category,
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
    async delete(req, res) {
        const {id} = req.params;
        try {
            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found',
                })
            }
            await category.remove();
            return res.status(200).json({
                success: true,
                message: 'Category deleted successfully',
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
module.exports = new CategoryController();