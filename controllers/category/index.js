
const getAllCategories = require("./category").getAllCategories;
const getCategoryById = require("./category").getCategoryById;
const createCategory = require("./category").createCategory;
const updateCategory = require("./category").updateCategory;
const deleteCategory = require("./category").deleteCategory;

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};