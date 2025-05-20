"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const JOB_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "DevOps Engineer",
  "Marketing Specialist",
  "Sales Representative",
];

const EXAMPLE_RESUME = `JANE DOE
Frontend Developer | jane.doe@example.com | (123) 456-7890 | github.com/janedoe

EXPERIENCE
Senior Frontend Developer, Tech Company Inc.
June 2020 - Present
- Developed responsive web applications using React and TypeScript
- Implemented state management with Redux and Context API
- Collaborated with UX designers to implement pixel-perfect designs

Frontend Developer, Startup XYZ
January 2018 - May 2020
- Built and maintained multiple client-facing applications
- Improved page load times by 40% through code optimization
- Mentored junior developers and conducted code reviews

SKILLS
Languages: JavaScript, TypeScript, HTML, CSS
Frameworks/Libraries: React, Vue.js, Next.js, Tailwind CSS
Tools: Git, Webpack, Jest, Cypress

EDUCATION
Bachelor of Science in Computer Science
University of Technology, 2017`;

interface ResumeFormProps {
  onSubmit: (resumeText: string, jobRole: string) => void;
  isLoading: boolean;
}

export default function ResumeForm({ onSubmit, isLoading }: ResumeFormProps) {
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeText.trim()) {
      setError("Please enter your resume text");
      return;
    }

    if (!jobRole) {
      setError("Please select a job role");
      return;
    }

    setError("");
    onSubmit(resumeText, jobRole);
  };

  const loadExampleResume = () => {
    setResumeText(EXAMPLE_RESUME);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="resume" className="text-base flex items-center">
              <FileText className="mr-2 h-4 w-4 text-primary" />
              Resume Text
            </Label>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={loadExampleResume}
              className="text-xs text-primary"
            >
              Load Example
            </Button>
          </div>
          <Textarea
            id="resume"
            placeholder="Paste your resume text here..."
            className="min-h-[300px] resize-none border-primary/20 focus-visible:ring-primary/30"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="job-role" className="text-base flex items-center">
            <Briefcase className="mr-2 h-4 w-4 text-primary" />
            Target Job Role
          </Label>
          <Select value={jobRole} onValueChange={setJobRole}>
            <SelectTrigger
              id="job-role"
              className="border-primary/20 focus:ring-primary/30"
            >
              <SelectValue placeholder="Select a job role" />
            </SelectTrigger>
            <SelectContent>
              {JOB_ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && (
          <motion.p
            className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-2 rounded-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Get Feedback"
          )}
        </Button>
      </form>
    </motion.div>
  );
}
