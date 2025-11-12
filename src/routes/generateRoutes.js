import express from "express";
import { generateThread } from "../controllers/generateController.js";

const router = express.Router();

router.post("/tweet", generateThread);

export default router;
