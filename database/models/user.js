import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userName: String,
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;