// backend/controllers/reviewController.js
import OpenAI from "openai";
import { pool } from "../config/db.js";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY?.trim(),
});

// Validate API key on startup
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing in .env");
  process.exit(1);
}

/**
 * POST /api/review
 * - Expects { resumeText, jobRole } in req.body
 * - Calls OpenAI to get JSON feedback { strengths, improvements, rating }
 * - Inserts into feedback_history and returns { strengths, improvements, rating, id, createdAt }
 */
export async function createReview(req, res) {
  try {
    const { resumeText, jobRole } = req.body;
    if (!resumeText || !jobRole) {
      return res
        .status(400)
        .json({ error: "Resume text and job role are required" });
    }

    // Generate AI feedback
    const feedback = await generateAIFeedback(resumeText, jobRole);

    // Insert into database
    const { rows } = await pool.query(
      `
      INSERT INTO feedback_history
        (resume_text, job_role, strengths, improvements, rating)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING id, created_at
      `,
      [
        resumeText,
        jobRole,
        feedback.strengths,
        feedback.improvements,
        feedback.rating,
      ]
    );

    res.json({
      ...feedback,
      id: rows[0].id,
      createdAt: rows[0].created_at,
    });
  } catch (error) {
    console.error("Error in createReview:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to process review" });
  }
}

/**
 * GET /api/history
 * - Fetches last 10 reviews (id, job_role, strengths, improvements, rating, created_at)
 * - Returns JSON array
 */
export async function getHistory(req, res) {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        id,
        job_role,
        strengths,
        improvements,
        rating,
        created_at
      FROM feedback_history
      ORDER BY created_at DESC
      LIMIT 10
      `
    );
    res.json(rows);
  } catch (error) {
    console.error("Error in getHistory:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}

/**
 * Helper: Calls OpenAI and returns parsed JSON feedback
 */
async function generateAIFeedback(resumeText, jobRole) {
  const prompt = `
You are a professional resume reviewer.
Analyze this resume for a ${jobRole} position and respond ONLY with valid JSON in this exact format:
{
  "strengths": ["...3–4 bullet items..."],
  "improvements": ["...3–4 bullet items..."],
  "rating": number  // between 1 and 10
}

Resume:
${resumeText}
  `.trim();

  try {
    const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
    console.log("Using OpenAI model:", model);

    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("AI analysis failed");
  }
}
