import express from "express";
import cors from "cors";
import { authenticateAPIKey } from "./middleware/apiAuth.js";
import dotenv from "dotenv";
dotenv.config();

import user from "./routes/user.js";
import category from "./routes/category.js";
import result from "./routes/result.js";
import question from "./routes/question.js";
import all from "./routes/all.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
// Import and use your authentication middleware
app.use(authenticateAPIKey);

// Routes
app.use("/api/user", user);
app.use("/api/category", category);
app.use("/api/result", result);
app.use("/api/question", question);
app.use("/api/all", all);

app.get("/", async (req, res) => {
  res.status(200).json({ msg: "Welcome to the Express server 2!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;