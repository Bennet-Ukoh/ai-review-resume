// backend/server.js
import "dotenv/config"; // Load .env at the very top
import express from "express";
import cors from "cors";
import { pool } from "./config/db.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK" });
});

// Mount review routes at /api
app.use("/api", reviewRoutes);

// Initialize database tables if they don’t exist
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feedback_history (
        id SERIAL PRIMARY KEY,
        resume_text TEXT NOT NULL,
        job_role TEXT NOT NULL,
        strengths TEXT[],
        improvements TEXT[],
        rating FLOAT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ feedback_history table is ready");
  } catch (err) {
    console.error("❌ Database initialization failed:", err);
    process.exit(1);
  }
}

// Start server only after DB is ready
initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Fatal error during initialization:", err);
  });
