import Result from '../database/models/result.js';
import User from '../database/models/user.js';
import dbConnect from '../database/dbConnect.js';

export async function addUser(req, res) {
  try {
    await dbConnect();
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
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
      return res.status(404).json({ message: 'User not found' });
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
      return res.status(404).json({ message: 'User not found' });
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
    await User.findByIdAndDelete(userId)
    await Result.deleteMany({ userId });
    res.json({ message: 'User and associated results deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}