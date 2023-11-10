import express from "express";
const router = express.Router();
import { getAllData } from "../controllers/all.js";

router.get("/", getAllData);

export default router;