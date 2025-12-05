"use client";
import { useRouter } from "next/navigation";
import { useInterviewStore } from "@/store/useInterviewStore";
import { Role } from "@/store/useInterviewStore";
import { generateInterviewQuestions } from "@/lib/gemini";
import LoadingPage from "../interview/LoadingPage";

export default function InterviewConfig() {
  const router = useRouter();
  const {
    role,
    setRole,
    getAvailableRoles,
    experienceLevels,
    selectedExperience,
    setSelectedExperience,
    difficultyLevels,
    setSelectedDifficulty,
    selectedDifficulty,
    loading,
    //setLoading,
  } = useInterviewStore();
  const availableRoles = getAvailableRoles();
  //console.log(selectedExperience);
  const isStartDisabled =
    role === "" || selectedExperience === "" || selectedDifficulty === "";
  const startInterview = async () => {
    useInterviewStore.getState().setLoading(true);

    try {
      const questtions = await generateInterviewQuestions({
        role,
        experience: selectedExperience,
        difficulty: selectedDifficulty,
      });
      console.log("Generated Questions:", questtions);
      useInterviewStore.getState().setQuestions(questtions);
      router.push("/interview/questions");
    } catch (error) {
      console.error("Failed to start interview:", error);
      router.push("/error");
    } finally {
      useInterviewStore.getState().setLoading(false);
    }
  };
  if(loading === true) return <LoadingPage/>;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 to-blue-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text">
            Configure Your Mock Interview
          </h1>
          <p className="text-xl text-white-600 mt-4">
            AI will tailor questions just for you
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
          <div className="bg-linear-to-r from-purple-600 to-blue-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              Tell AI About Yourself
            </h2>
            <p className="text-white/90 text-lg mt-2">
              Better input = Killer interview
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            {/* Job Role */}
            <div>
              <label className="block text-xl font-semibold mb-4 text-gray-800">
                Job Role / Position
              </label>
              <select
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition text-gray-900"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                {availableRoles.map((role, index) => {
                  return (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xl font-semibold mb-4 text-gray-800">
                Years of Experience
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {experienceLevels.map((exp) => (
                  <button
                    role="experience"
                    key={exp}
                    onClick={() => setSelectedExperience(exp)}
                    className={`py-4 px-2 text-lg font-medium border-2 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition ${
                      selectedExperience === exp
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-300"
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xl font-semibold mb-4 text-gray-800">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-6">
                {difficultyLevels.map((level) => {
                  const isSelected = selectedDifficulty === level;
                  const anySelected = selectedDifficulty !== "";
                  const baseClasses =
                    "py-8 rounded-2xl text-2xl font-bold transition shadow-lg w-full";
                  const activeClasses =
                    level === "Easy"
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : level === "Medium"
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white";
                  const inactiveClasses =
                    "bg-gray-300 text-gray-700 border border-gray-200";

                  return (
                    <button
                      key={level}
                      onClick={() =>
                        setSelectedDifficulty(isSelected ? "" : level)
                      }
                      className={`${baseClasses} ${
                        isSelected
                          ? activeClasses
                          : anySelected
                          ? inactiveClasses
                          : activeClasses
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
                <span>Resume Upload</span>{" "}
                <span className="text-sm text-gray-500">(Optional but OP)</span>
              </label>
              <div className="border-4 border-dashed border-purple-300 rounded-2xl p-12 text-center hover:border-purple-500 transition cursor-pointer">
                <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">↑</span>
                </div>
                <p className="text-xl font-medium text-gray-700">
                  Drop your resume here
                </p>
                <p className="text-gray-500 mt-2">
                  or click to browse (PDF, DOCX)
                </p>
              </div>
            </div>

            {/* Extra Instructions */}
            <div>
              <label className="block text-xl font-semibold mb-4 text-gray-800">
                Any Special Instructions? (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="e.g., Focus on System Design + Leadership + React 19 + AWS... Amazon-style behavioral questions..."
                className="w-full p-5 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Start Button */}
            <div className="pt-6">
              <button
                className={`w-full py-6 text-white text-2xl font-bold rounded-2xl transition transform  shadow-xl flex items-center justify-center gap-4 ${
                  isStartDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105"
                }`}
                disabled={isStartDisabled}
                onClick={() => startInterview()}
              >
                Start Mock Interview
                <span className="text-3xl">→</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Powered by Google Gemini • 100% Free • No login required
        </p>
      </div>
    </div>
  );
}
