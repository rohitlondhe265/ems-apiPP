import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  examId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  attemptNo: {
    type: Number,
    default: 1,
  },
  timeTaken: {
    type: Number,
    required: true,
  },
  attemptedQuestions: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Result = mongoose.models.Result || mongoose.model("Result", resultSchema);

export default Result;