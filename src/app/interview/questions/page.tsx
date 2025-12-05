"use client";

import { useInterviewStore } from "@/store/useInterviewStore";
//import { use } from "react";
 
import { useRouter } from "next/navigation";

export default function InterviewQuestions() {
  const {
   // loading,
    questions,
    role,
    selectedExperience,
    selectedDifficulty,
    currentQuestionIndex,
    nextQuestion,
    //previousQuestion,
    userAnswers,
  } = useInterviewStore();
  const router = useRouter();
  const currentQ = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  //const isFirstQuestion = currentQuestionIndex === 0;

  const handleOptionsClick = (optionIndex: number) => {
    const answers = [...useInterviewStore.getState().userAnswers];
    answers[currentQuestionIndex] = optionIndex;
    useInterviewStore.getState().setUserAnswers(answers);
  };

  

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 to-blue-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Mock Interview is Ready!
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Role: <strong>{role}</strong> | Exp:{" "}
            <strong>{selectedExperience}</strong> | Difficulty:{" "}
            <strong>{selectedDifficulty}</strong>
          </p>
        </div>

        {/* Timer + Progress */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 flex justify-between items-center">
          <div className="text-3xl font-bold text-purple-600">
            Question{" "}
            <span className="text-5xl">{currentQuestionIndex + 1}</span>/10
          </div>
          <div className="text-2xl font-mono text-gray-700">Time: 00:45</div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            {currentQ?.question}
          </h2>

          {/* Options */}
          <div className="space-y-6">
            {currentQ?.options?.map((option, i) => {
              const isSelected = userAnswers[currentQuestionIndex] === i;
              return (
                <button
                  key={i}
                  onClick={() => handleOptionsClick(i)}
                  className={`w-full text-left p-6 text-xl bg-gray-50 border-2 rounded-2xl transition ${
                    isSelected
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {/* <button
          onClick={previousQuestion}
          disabled={isFirstQuestion}
          className="px-10 py-4 bg-gray-300 text-gray-700 rounded-full text-xl font-bold hover:bg-gray-400 transition">
            ← Previous
          </button> */}
          <button
            onClick={() => {
              if (isLastQuestion) {
                router.push("/interview/result");
              } else {
                nextQuestion();
              }
            }}
            className="px-10 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-full text-xl font-bold hover:scale-105 transition shadow-xl align-right flex items-center gap-4 ml-auto"
          >
            {isLastQuestion ? "Submit & See Score →" : "Next Question →"}
          </button>
        </div>
      </div>
    </div>
  );
}
