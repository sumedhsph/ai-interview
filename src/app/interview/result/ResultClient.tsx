// app/interview/result/ResultClient.tsx
"use client";

import { useInterviewStore } from "@/store/useInterviewStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultClient() {
  const router = useRouter();
  const { questions, userAnswers, resetInterview } = useInterviewStore();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (questions.length === 0) {
      router.replace("/interview");
    }
  }, [questions, router]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-4xl">Redirecting...</div>
      </div>
    );
  }

  // Score calculation
  let correct = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] !== null && userAnswers[i] === q.correct) correct++;
  });
  const percentage = Math.round((correct / questions.length) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: "FAANG Level Performance!", color: "text-green-400" };
    if (percentage >= 80) return { text: "Outstanding! You're Hire-Ready!", color: "text-green-400" };
    if (percentage >= 70) return { text: "Very Good! Just a little polish needed", color: "text-yellow-400" };
    if (percentage >= 50) return { text: "Good Effort! Keep Practicing", color: "text-orange-400" };
    return { text: "You need more practice bhai!", color: "text-red-400" };
  };

  const { text: message, color: messageColor } = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 to-blue-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Main Score Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/20">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8">Your Score</h1>
          
          <div className="relative inline-block">
            <div className="text-9xl md:text-[180px] font-extrabold bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              {percentage}%
            </div>
            <div className="absolute -top-4 -right-8 text-4xl animate-ping">✨</div>
          </div>

          <p className="text-4xl text-white/90 mt-6 font-semibold">
            {correct} / {questions.length} Correct
          </p>

          <p className={`text-3xl md:text-4xl font-bold mt-8 ${messageColor}`}>
            {message}
          </p>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-10 py-5 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl rounded-full hover:scale-110 transition shadow-2xl flex items-center gap-3"
            >
              {showDetails ? "Hide" : "See Details"}
            </button>

            <button
              onClick={() => {
                resetInterview();
                router.push("/interview");
              }}
              className="px-12 py-5 bg-white text-purple-700 font-bold text-xl rounded-full hover:scale-110 transition shadow-2xl"
            >
              New Interview
            </button>
          </div>
        </div>

        {/* Detailed Review - Only shows when clicked */}
        {showDetails && (
          <div className="mt-10 bg-linear-to-br from-purple-900 to-blue-900 rounded-3xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Detailed Review</h2>
            
            <div className="space-y-8">
              {questions.map((q, i) => {
                const userAns = userAnswers[i];
                const isCorrect = userAns === q.correct;
                const userOption = userAns !== null ? q.options[userAns] : "Not answered";
                const correctOption = q.options[q.correct];

                return (
                  <div
                    key={i}
                    className={`p-8 rounded-2xl border-4 transition-all ${
                      isCorrect
                        ? "bg-purple-300 border-green-500"
                        : userAns === null
                        ? "bg-purple-300 border-gray-400"
                        : "bg-purple-300 border-red-500"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 flex-1">
                        Q{i + 1}. {q.question}
                      </h3>
                      <span className={`ml-4 px-4 py-2 rounded-full text-white font-bold text-lg ${
                        isCorrect ? "bg-green-600" : userAns === null ? "bg-gray-500" : "bg-red-600"
                      }`}>
                        {isCorrect ? "Correct" : userAns === null ? "Skipped" : "Wrong"}
                      </span>
                    </div>

                    <div className="space-y-3 mt-4 text-lg">
                      <p className="text-gray-700">
                        <span className="font-semibold">Your Answer:</span>{" "}
                        <span className={userAns === null ? "text-gray-500 italic" : isCorrect ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                          {userOption}
                        </span>
                      </p>
                      {!isCorrect && userAns !== null && (
                        <p className="text-green-700 font-bold">
                          Correct Answer: {correctOption}
                        </p>
                      )}
                      <p className="text-gray-600 italic mt-3 text-base">
                        <span className="font-semibold">Explanation:</span> {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}