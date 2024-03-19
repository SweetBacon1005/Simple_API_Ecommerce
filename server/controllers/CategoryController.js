const Category = require('../models/Category');
const createCategory = async (req, res) => {
    const { name } = req.body;
    if(!name){
        return res.status(400).json({
            success: false,
            message: 'Name is required'
        })
    }
    try{
        const category = await Category.findOne({name});
        if(category){
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            })
        }
        const newCategory = new Category({name});
        await newCategory.save();
        return res.status(201).json({
            success: true,
            message: 'Category created'
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
const getAllCategory = async (req, res) => {
    try{
        const categories = await Category.find();
        return res.status(200).json({
            success: true,
            categories
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
const getByIdCategory = async (req, res) => {
    const { id } = req.params;
    try{
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }
        return res.status(200).json({
            success: true,
            category
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
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if(!name){
        return res.status(400).json({
            success: false,
            message: 'Name is required'
        })
    }
    try{
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }
        category.name = name;
        await category.save();
        return res.status(200).json({
            success: true,
            message: 'Category updated'
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
const deleteByIdCategory = async (req, res) => {
    const { id } = req.params;
    try{
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }
        await category.delete();
        return res.status(200).json({
            success: true,
            message: 'Category deleted'
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
module.exports = { createCategory, getAllCategory, getByIdCategory, updateCategory, deleteByIdCategory}