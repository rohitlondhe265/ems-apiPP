import Result from "../database/models/result.js";
import User from "../database/models/user.js";
import dbConnect from "../database/dbConnect.js";

export async function addUser(req, res) {
  const { email } = req.body;
  try {
    await dbConnect();
    // Check if the email exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If the email exists, send a message
      return res.status(200).json({ message: "Email exists in the database" });
    } else {
      // If the email does not exist, create a new user
      await User.create(req.body);
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    await dbConnect();
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  try {
    await dbConnect();
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    await dbConnect();
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    await dbConnect();
    await User.findByIdAndDelete(userId);
    await Result.deleteMany({ userId });
    res.json({ message: "User and associated results deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
