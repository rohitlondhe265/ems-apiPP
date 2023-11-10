import Result from '../database/models/result.js';
import dbConnect from '../database/dbConnect.js';

export const addResult = async (req, res) => {
  const data = await req.body;
  try {
    await dbConnect();
    const newResult = new Result(data);
    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getRank = async (req, res) => {
  try {
    const examId = req.params.examId;

    // Find the user's result
    const userResult = await Result.findOne({ examId });

    if (!userResult) {
      return res.status(404).json({ message: 'User result not found for the specified examId.' });
    }

    // Calculate rank based on the score
    const userScore = userResult.score;

    // Count the number of users with a higher or equal score
    const rank = await Result.countDocuments({ examId, score: { $gte: userScore } });

    res.json({ rank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getRanks = async (req, res) => {
  try {
    const examId = req.params.examId;

    // Find results for the specified examId and sort them
    const results = await Result.find({ examId })
      .sort({ score: -1, attemptedQuestions: 1, timeTaken: 1 })
      .populate('userId');

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getResults = async (req, res) => {
  try {
    await dbConnect();
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getResult = async (req, res) => {
  try {
    await dbConnect();
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateResult = async (req, res) => {
  try {
    await dbConnect();
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteResult = async (req, res) => {
  const resultId = req.params.id;
  try {
    await dbConnect();
    const result = await Result.findByIdAndRemove(resultId);

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json({ message: 'Result deleted', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}