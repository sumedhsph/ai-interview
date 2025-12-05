// src/store/useInterviewStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Role =
  | "Frontend Developer"
  | "Backend Developer"
  | "Full Stack Developer"
  | "React Developer";

export type ExperienceLevel = "0-3" | "3-5" | "5+" | "10+";
export type DifficultyLevel = "Easy" | "Medium" | "Hard";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface InterviewStore {
  // Config
  role: Role | "";
  setRole: (role: Role | "") => void;
  getAvailableRoles: () => Role[];

  experienceLevels: ExperienceLevel[];
  selectedExperience: ExperienceLevel | "";
  setSelectedExperience: (level: ExperienceLevel | "") => void;

  difficultyLevels: DifficultyLevel[];
  selectedDifficulty: DifficultyLevel | "";
  setSelectedDifficulty: (level: DifficultyLevel | "") => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  // Interview
  questions: Question[];
  setQuestions: (questions: Question[]) => void;

  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;

  userAnswers: (number | null)[];
  setUserAnswers: (answers: (number | null)[]) => void;

  // Navigation & Actions
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetInterview: () => void;
}

export const useInterviewStore = create<InterviewStore>()(
  devtools(
    (set) => ({
      // Default State
      role: "Frontend Developer",
      selectedExperience: "",
      selectedDifficulty: "",
      loading: false,
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],

      experienceLevels: ["0-3", "3-5", "5+", "10+"],
      difficultyLevels: ["Easy", "Medium", "Hard"],

      // Getters
      getAvailableRoles: () => [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "React Developer",
      ],

      // Setters
      setRole: (role) => set({ role }),
      setSelectedExperience: (selectedExperience) => set({ selectedExperience }),
      setSelectedDifficulty: (selectedDifficulty) => set({ selectedDifficulty }),
      setLoading: (loading) => set({ loading }),

      setQuestions: (questions) =>
        set({
          questions,
          userAnswers: new Array(questions.length).fill(null),
          currentQuestionIndex: 0,
        }),

      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      setUserAnswers: (answers) => set({ userAnswers: answers }),

      // Safe Navigation
      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.min(
            state.currentQuestionIndex + 1,
            state.questions.length - 1
          ),
        })),

      previousQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
        })),

      // Reset Everything
      resetInterview: () =>
        set({
          role: "Frontend Developer",
          selectedExperience: "",
          selectedDifficulty: "",
          loading: false,
          questions: [],
          currentQuestionIndex: 0,
          userAnswers: [],
        }),
    }),
    { name: "InterviewStore" }
  )
);

declare global {
  interface Window {
    store: typeof useInterviewStore;
  }
}

if (typeof window !== "undefined") {
  window.store = useInterviewStore;
}