import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  set: String,
  section: String,
  question: String,
  options: [String],
  answer: String,
  explanation: String,
});

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
