import express from "express";
import { addQuestion, getQuestionsByCat, addQuestions, deleteQuestion, getQuestion, getQuestions, updateQuestion } from "../controllers/question.js";
const router = express.Router();

// Create a new question
router.post('/', addQuestion);

router.post('/bulk', addQuestions);

// Get questions by CategoryID and set, section
router.get('/category/:categoryId', getQuestionsByCat)

// Get all questions
router.get('/', getQuestions);

// Get a single question by ID
router.get('/:id', getQuestion);

// Update a question by ID
router.put('/:id', updateQuestion);

// Delete a question by ID
router.delete('/:id', deleteQuestion);

export default router;
