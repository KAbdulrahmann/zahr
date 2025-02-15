// Import any necessary modules or models

import Category from "../../models/Category.js";

// Define your category controller functions
export const getAllCategories = async (req, res) => {
    
    // put try and catch block
    try{
const categories = await Category.find();
res.status(200).json(categories);
    }catch(error){
        res.status(404).json({message:error.message});
    }
   


};

export const getCategoryById = async (req, res) => {
    
    // put try and catch block
    try{
        const {id} = req.params;
        const category = await Category.findById(id);
        res.status(200).json(category);
    }catch(error){
        res.status(404).json({message:error.message});
    }
    
    
};

export const createCategory = async (req, res) => {
    
    // put try and catch block
    try{
        const category = req.body;
        const newCategory = new Category(category);
        await newCategory.save();
        res.status(201).json(newCategory);
    }catch(error){
        res.status(409).json({message:error.message});
    }
};

export const updateCategory = async (req, res) => {
    
    // put try and catch block
    try{
        const {id} = req.params;
        const category = req.body;
        const updatedCategory = await Category.findByIdAndUpdate
        (id, {...category, _id}, {new:true});
        res.json(updatedCategory);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
};

export const deleteCategory = async (req, res) => {
    
    // put try and catch block
    // i want to soft delete the category
    try{
        const {id} = req.params;
        await Category.findByIdAndUpdate(id, {isDeleted:true});
        res.json({message:"Category deleted successfully"});
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
};

// Export the category controller functions
// export default  {
//     getAllCategories,
//     getCategoryById,
//     createCategory,
//     updateCategory,
//     deleteCategory,
// };