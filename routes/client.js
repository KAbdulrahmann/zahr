import express from "express";
import { getTransactions } from "../controllers/client.js";
import { getGeography } from "../controllers/client.js";
import { getProducts } from "../controllers/products/products.js";
import { addProduct } from "../controllers/products/products.js";
import { getCustomers } from "../controllers/customer/customer.js";

import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/category/category.js";
import settingsController from '../controllers/settings/index.js'; // Import from index.js

const router = express.Router();

router.get("/products", getProducts);
router.post("/product/add", addProduct);

router.post("/category", createCategory);
router.get("/category", getAllCategories);
 
router.get("/settings", settingsController.getSettings);
router.post("/settings", settingsController.setSettings);

router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
