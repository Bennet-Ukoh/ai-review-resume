// backend/routes/reviewRoutes.js
import { Router } from "express";
import { createReview, getHistory } from "../controllers/reviewController.js";

const router = Router();

// POST /api/review → createReview controller
router.post("/review", createReview);

// GET /api/history → getHistory controller
router.get("/history", getHistory);

export default router;
