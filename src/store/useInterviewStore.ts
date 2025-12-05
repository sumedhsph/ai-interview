// store/useInterviewStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

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

export const useInterviewStore = create<InterviewState>()(
  devtools((set) => ({
    // Initial state
    role: '',
    experience: '',
    difficulty: 'Medium',
    resume: null,
    customInstructions: '',
    sessionId: null,
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    score: null,
    startedAt: null,
    endedAt: null,

    // Actions
    setConfig: (config) => set(config),

    startSession: (sessionId, questions) =>
      set({
        sessionId,
        questions,
        userAnswers: new Array(questions.length).fill(null),
        currentQuestionIndex: 0,
        score: null,
        startedAt: new Date().toISOString(),
        endedAt: null,
      }),

    answerQuestion: (answerIndex) =>
      set((state) => {
        const newAnswers = [...state.userAnswers];
        newAnswers[state.currentQuestionIndex] = answerIndex;
        return { userAnswers: newAnswers };
      }),

    nextQuestion: () =>
      set((state) => ({
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
      })),

    previousQuestion: () =>
      set((state) => ({
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      })),

    endSession: () =>
      set((state) => {
        // Calculate score
        const correct = state.userAnswers.reduce((acc, answer, i) => {
          return answer === state.questions[i]?.correct ? acc + 1 : acc;
        }, 0);
        const percentage = Math.round((correct / state.questions.length) * 100);

        return {
          score: percentage,
          endedAt: new Date().toISOString(),
        };
      }),

    reset: () =>
      set({
        role: '',
        experience: '',
        difficulty: 'Medium',
        resume: null,
        customInstructions: '',
        sessionId: null,
        questions: [],
        currentQuestionIndex: 0,
        userAnswers: [],
        score: null,
        startedAt: null,
        endedAt: null,
      }),
  }))
);