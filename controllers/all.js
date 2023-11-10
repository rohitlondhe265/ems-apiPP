import Category from "../database/models/category.js";
import User from "../database/models/user.js";
import Result from "../database/models/result.js";
import Question from "../database/models/question.js";
import dbConnect from "../database/dbConnect.js";

export const getAllData = async (req, res) => {
  try {
    await dbConnect();
    const users = await User.find();
    const categories = await Category.find();
    const results = await Result.find();
    const questions = await Question.find();
    res.status(200).json({ users, categories, results, questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
