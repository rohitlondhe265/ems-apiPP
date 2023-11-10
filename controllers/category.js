import Category from '../database/models/category.js'
import dbConnect from '../database/dbConnect.js'
import Question from '../database/models/question.js';
import Result from '../database/models/result.js';

export const addCategory = async (req, res) => {
  try {
    await dbConnect();
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getCategories = async (req, res) => {
  try {
    await dbConnect();
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getCategory = async (req, res) => {
  try {
    await dbConnect();
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateCategory = async (req, res) => {
  try {
    await dbConnect();
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteCategory = async (req, res) => {
  try {
    await dbConnect();
    const categoryId = req.params.id;

    // Delete associated questions
    await Question.deleteMany({ category: categoryId });

    // Find all results with examIds starting with categoryId
    const resultsToDelete = await Result.find({ examId: new RegExp(`^${categoryId}`, 'i') });

    // Delete associated results
    await Result.deleteMany({ _id: { $in: resultsToDelete.map(result => result._id) } });

    // Delete the category
    const category = await Category.findByIdAndRemove(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted along with associated questions and results' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}