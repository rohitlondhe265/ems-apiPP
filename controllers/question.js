import Question from "../database/models/question.js";
import dbConnect from "../database/dbConnect.js";
import { generateData, modifyData } from "../middleware/helpers.js";

export async function addQuestion(req, res) {
  try {
    await dbConnect();
    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const addQuestions = async (req, res) => {
  const { text, category, set, section } = await req.body;
  try {
    let questions = await generateData(text);
    await modifyData(questions);
    questions.forEach((obj) => {
      obj.category = category;
      obj.set = set;
      obj.section = section;
    });
    await dbConnect();
    const insertedQuestions = await Question.insertMany(questions);
    res.status(201).json(insertedQuestions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuestionsByCat = async (req, res) => {
  const categoryId = req.params.categoryId;
  const set = req.query.set;
  const section = req.query.section;
  try {
    const query = {
      category: categoryId,
    };
    if (set) {
      query.set = set;
    }
    if (section) {
      query.section = section;
    }
    await dbConnect();
    const questions = await Question.find(query);

    if (questions.length === 0) {
      return res.status(404).json({
        message: "No questions found for the specified category and set",
      });
    }

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function getQuestions(req, res) {
  try {
    await dbConnect();
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getQuestion(req, res) {
  try {
    await dbConnect();
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateQuestion(req, res) {
  try {
    await dbConnect();
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteQuestion(req, res) {
  try {
    await dbConnect();
    const question = await Question.findByIdAndRemove(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
