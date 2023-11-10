import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  questions: Number,
  pointsPerQuestion: Number,
  time: Number,
  description: String,
  banner: String,
  instructions: String,
  sets: [String],
  sections: [String],
  tags: [String],
  isPaid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
