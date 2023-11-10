import express from "express";
import { addUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
const router = express.Router();

// Create a new user
router.post('/', addUser);

// Get all users
router.get('/', getUsers);

// Get a single user by ID
router.get('/:id', getUser);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

export default router;
