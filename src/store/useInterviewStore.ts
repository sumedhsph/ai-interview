import {create} from "zustand";
import {devtools} from "zustand/middleware";

type Difficulty = "Easy" | "Medium" | "Hard";

export type Question = {
    id: string;
    question: string;
    answer: string[];
    correct: number;
    explanation: string;
}

type InterviewState = {
  // Config
  role: string;
  experience: string;
  difficulty: Difficulty;
  resume: File | null;
  customInstructions: string;

  // Session
  sessionId: string | null;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  score: number | null;
  startedAt: string | null;
  endedAt: string | null;

  // Actions
  setConfig: (config: {
    role: string;
    experience: string;
    difficulty: Difficulty;
    resume: File | null;
    customInstructions: string;
  }) => void;

  startSession: (sessionId: string, questions: Question[]) => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  endSession: () => void;
  reset: () => void;
};