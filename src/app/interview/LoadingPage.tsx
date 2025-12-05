"use client";
export default function InterviewLoading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-8 border-8 border-white/20 border-t-white rounded-full animate-spin"></div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          AI is Preparing Your Interview
        </h1>
        <p className="text-xl text-white/80">
          Generating 10 killer questions just for you...
        </p>
        <div className="mt-10 flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-4 h-4 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}