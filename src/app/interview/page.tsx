"use client";

export default function InterviewConfig() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 to-blue-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text">
            Configure Your Mock Interview
          </h1>
          <p className="text-xl text-white-600 mt-4">AI will tailor questions just for you</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">

          <div className="bg-linear-to-r from-purple-600 to-blue-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Tell AI About Yourself</h2>
            <p className="text-white/90 text-lg mt-2">Better input = Killer interview</p>
          </div>

          <div className="p-8 md:p-12 space-y-10">

            {/* Job Role */}
            <div>
              <label className="block text-xl font-semibold mb-4 text-gray-800">Job Role / Position</label>
              <select className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition">
                <option value="">Select your target role</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>React Developer</option>
                <option>SDE 1 / SDE 2 / SDE 3</option>
                <option>System Design</option>
                <option>DevOps Engineer</option>
                <option>Tech Lead</option>
                 
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xl font-semibold mb-4 text-gray-800">Years of Experience</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {["Fresher", "0-1", "1-2", "2-4", "4-6", "6+"].map((exp) => (
                  <button key={exp} className="py-4 px-2 text-lg font-medium border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition">
                    {exp === "Fresher" ? "Fresher" : `${exp} yr`}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xl font-semibold mb-4 text-gray-800">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-6">
                <button className="py-8 rounded-2xl text-2xl font-bold text-white bg-green-500 hover:bg-green-600 transition shadow-lg">
                  Easy
                </button>
                <button className="py-8 rounded-2xl text-2xl font-bold text-white bg-yellow-500 hover:bg-yellow-600 transition shadow-lg">
                  Medium
                </button>
                <button className="py-8 rounded-2xl text-2xl font-bold text-white bg-red-500 hover:bg-red-600 transition shadow-lg">
                  Hard
                </button>
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
                <span>Resume Upload</span> <span className="text-sm text-gray-500">(Optional but OP)</span>
              </label>
              <div className="border-4 border-dashed border-purple-300 rounded-2xl p-12 text-center hover:border-purple-500 transition cursor-pointer">
                <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">↑</span>
                </div>
                <p className="text-xl font-medium text-gray-700">Drop your resume here</p>
                <p className="text-gray-500 mt-2">or click to browse (PDF, DOCX)</p>
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
              <button className="w-full py-6 bg-linear-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold rounded-2xl hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105 shadow-xl flex items-center justify-center gap-4">
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