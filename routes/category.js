import express from "express";
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/category.js";
const router = express.Router();

// Create a new category
router.post('/', addCategory);

// Get all categories
router.get('/', getCategories);

// Get a single category by ID
router.get('/:id', getCategory);

// Update a category by ID
router.put('/:id', updateCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

export default router;
