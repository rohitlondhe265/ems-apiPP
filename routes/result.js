import express from "express";
import { addResult, getRanks, deleteResult, getResult, getResults, updateResult } from "../controllers/result.js";
const router = express.Router();

// Create a new result
router.post('/', addResult);

// Get results by examId and rank by score and timeTaken
router.get('/rank/:examId', getRanks)

// Get all results
router.get('/', getResults);

// Get a single result by ID
router.get('/:id', getResult);

// Update a result by ID
router.put('/:id', updateResult);

// Delete a result by ID
router.delete('/:id', deleteResult);

export default router;
