# AI Resume Reviewer

> A full‐stack AI‐powered resume‐reviewer built as part of the 3MTT × Darey.io course.  
> This project demonstrates everything I learned—especially on the backend—during the cohort.

---

## Project Overview

**AI Resume Reviewer** is a web application where users can upload or paste their resume text, select a target job role, and receive instant, AI‐generated feedback in JSON form—highlighting strengths, suggested improvements, and an overall rating. All feedback is stored in a PostgreSQL database, and users can view a history of past reviews.

This project was built to showcase everything learned during the 3MTT x Darey.io course, with a special focus on the backend (Express + Postgres). It integrates:

- A Next.js (React) frontend with Tailwind CSS and Framer Motion for animations.
- An Express.js backend that handles file uploads, text extraction, and AI calls.
- OpenAI (or Hugging Face) to power the resume analysis.
- PostgreSQL to store review history.
- Modular architecture (controllers, routes, services) for maintainability.

---

## Features

- **Resume Submission**

  - Paste resume text or upload a PDF.
  - Choose a target job role (e.g., “Software Engineer,” “Product Manager”).

- **AI‐Powered Feedback**

  - Uses an LLM (e.g., OpenAI’s GPT‐3.5‐turbo) to generate:
    - An array of strengths (3–4 bullet points)
    - An array of improvements (3–4 bullet points)
    - A numeric rating (1–10)
  - Displays feedback in a clean, responsive UI.

- **Review History**

  - Stores each review (including original resume text, role, feedback, timestamp) in PostgreSQL.
  - Users can view the last 10 reviews with rating, job role, and time elapsed.

- **Responsive & Animated UI**

  - Next.js + Tailwind CSS for responsive layouts.
  - Framer Motion for smooth entry/exit animations.
  - Loading skeletons while fetching history.

- **Modular Backend**
  - **Controllers** handle business logic (AI prompt, DB queries).
  - **Routes** map HTTP endpoints to controllers.
  - **Config** holds database setup.
  - Integrated error handling and environment‐variable validation.

---

## Tech Stack

- **Frontend**

  - Next.js (App Router)
  - React
  - Tailwind CSS
  - Framer Motion
  - Lucide‐React (icons)

- **Backend**

  - Node.js
  - Express.js
  - PostgreSQL (via `pg`)
  - OpenAI SDK
  - Multer + pdf‐parse / tesseract.js (for PDF/image text extraction)

- **Others**
  - PgAdmin
  - dotenv (environment‐variable management)
  - ESLint + Prettier (optional, for code quality)

---

## Prerequisites

- **Node.js** ≥ 16.x (LTS)
- **npm** or **yarn**
- **PostgreSQL** ≥ 12.x (or Docker)
- An **OpenAI API key** (or Hugging Face API token)

---

## Setup & Installation

### Clone the repo

```
git clone  https://github.com/Bennet-Ukoh/ai-review-resume.git
```

cd ai-resume-reviewer

## Backend Setup

Navigate to the backend folder:

cd backend
Install dependencies:

npm install

# or

yarn install
Create a PostgreSQL database (locally or via Docker). For example, with Docker:

docker run --name ai_resume_db -e POSTGRES_PASSWORD=your_pw -e POSTGRES_USER=your_user -e POSTGRES_DB=resume_db -p 5432:5432 -d postgres:13
Copy or create .env in the backend folder:

PORT=3001
DB_USER=your_user
DB_PASSWORD=your_pw
DB_HOST=localhost
DB_NAME=resume_db
DB_PORT=5432

# Choose one:

OPENAI_API_KEY=sk-**\*\***\*\*\***\*\***

Initialize the database tables (will run automatically on server start):

node server.js

# Or for auto‐reload during development:

npx nodemon server.js
You should see:

✅ feedback_history table is ready
🚀 Server running on http://localhost:3001
Frontend Setup
In a new terminal, navigate to the client folder:

cd ../client
Install dependencies:

npm install

# or

yarn install
Create a .env.local file in client (if you need to proxy or add environment variables; not strictly required if backend is on localhost:3001):

NEXT_PUBLIC_API_URL=http://localhost:3001/api
Run the Next.js app:

npm run dev

# or

yarn dev
You should see:

> Local: http://localhost:3000
> Network: use --host to expose

# Environment Variables

Both backend/.env and client/.env.local are required (or you can hardcode API_URL as http://localhost:3001/api in front end, but it’s recommended to use the env file).

Backend (.env)

PORT=3001
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=resume_db
DB_PORT=5432
OPENAI_API_KEY=sk-xxxxxxxxxxx

Frontend (.env.local)

NEXT_PUBLIC_API_URL=http://localhost:3001/api
Use NEXT_PUBLIC_API_URL if you reference it with process.env.NEXT_PUBLIC_API_URL in client code.

# Run Locally

Make sure your PostgreSQL instance is running and .env is configured.

Start the backend (in ai-resume-reviewer/backend):

npx nodemon server.js
Start the frontend (in ai-resume-reviewer/client):

npm run dev
Open your browser to http://localhost:3000.
• Click “Review My Resume” to go to the review page.
• Submit a sample resume and watch the AI feedback appear instantly.
• Switch to “Review History” to see past reviews.

# Usage

- Submit a resume

- On the home page, click “Review My Resume” or navigate to /review.

- Paste your resume text or upload a PDF (if implemented).

- Select a target job role from the dropdown.

- Click “Submit”.

- The AI-generated feedback (strengths, improvements, rating) will display instantly.

- View review history

- Click the “Review History” tab.

- You’ll see the last 10 reviews, each with job role, rating, and relative timestamp.

- Click a card to expand details (if you add expand-on-click features).

# Project Structure

ai-resume-reviewer/
├── backend/
│ ├── config/
│ │ └── db.js # PostgreSQL pool setup
│ ├── controllers/
│ │ └── reviewController.js # Business logic (AI prompt + DB queries)
│ ├── routes/
│ │ └── reviewRoutes.js # Express router for /api/review & /api/history
│ ├── server.js # Main Express entry, table initialization
│ └── .env # Backend environment variables
│
├── client/
│ ├── app/
│ │ ├── page.tsx # Home page (Hero, How-it-Works, CTA)
│ │ └── review/
│ │ ├── page.tsx # Review page with tabs, uses SubmitSection & HistoryList
│ │ └── error.tsx # Optional Next.js error boundary
│ ├── components/
│ │ ├── history-list/ # HistoryList, HistoryCard, Skeleton, etc.
│ │ ├── resume-form.tsx # Form for resumeText + jobRole
│ │ ├── feedback-display.tsx # Displays AI feedback arrays + rating
│ │ └── review/ # SubmitSection, HistorySection, ReviewHeader
│ ├── lib/
│ │ └── api.ts # `fetchHistory()` & `postReview()` helper functions
│ ├── hooks/
│ │ └── useHistoryData.ts # Custom hook (or replaced by React Query)
│ ├── public/ # Static assets (images, favicon)
│ └── .env.local # Frontend environment variables
│
├── README.md # ← You are here
└── .gitignore

# How It Works

- User submits a resume (either plain text or a PDF upload) and selects a job role.

- Frontend (ResumeForm component) calls postReview(resumeText, jobRole) in lib/api.ts.

- Backend (POST /api/review route) calls generateAIFeedback(resumeText, jobRole) in reviewController.js:

- Builds a prompt requiring valid JSON response from LLM.

- Calls OpenAI (or Hugging Face) to generate feedback.

- Parses the JSON returned (strengths, improvements, rating).

- Saves that feedback, job role, and original text into PostgreSQL’s feedback_history table.

- Returns the JSON feedback to the frontend.

- Frontend receives feedback object and displays it in FeedbackDisplay.

- HistoryList (on the “Review History” tab) calls /api/history, retrieves an array of the last 10 reviews, and displays each using HistoryCard.

  # What I Learned

- This entire project was built as part of the 3MTT x Darey.io learning track. Key lessons implemented here:

- Express & PostgreSQL

- How to configure and connect a Node.js/Express app to a Postgres database using pg.

- Best practices for organizing controllers, routes, and config files.

- Writing SQL migrations (manually or via pool.query) to create tables.

- Storing arrays (TEXT[] in Postgres) and returning them to the frontend.

- ChatGPT/OpenAI Integration

- Crafting prompts that force a valid JSON response.

- Using the OpenAI Node.js SDK, handling errors (e.g., insufficient_quota).

- Next.js (App Router) & React

- Splitting UI into Server Components vs. Client Components (for data fetching vs. interactivity/animations).

- Using useEffect + custom hooks (useHistoryData) or React Query to manage server state.

- Leveraging Tailwind CSS for responsive layouts, Framer Motion for smooth animations.

- File Upload & Text Extraction

  # General Best Practices

- Separating concerns: controllers, routes, services, hooks, components.

- Using environment variables correctly (dotenv on the backend, .env.local on the frontend).

- Graceful error handling: HTTP status codes, error messages in UI, server‐side logs.

- All of these skills were taught and practiced during the 3MTT × Darey.io course—this project serves as a capstone to demonstrate them in a cohesive, end‐to‐end AI‐powered application.

# License

This project is released under the MIT License.

```

```
