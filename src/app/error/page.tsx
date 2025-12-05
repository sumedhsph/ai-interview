"use client";
export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-pink-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Sad Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-6xl">Sad Face</span>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Oops!
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-red-600 mb-6">
          Something Went Wrong
        </h2>

         

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-5 px-8 bg-linear-to-r from-purple-600 to-blue-600 text-white text-xl font-bold rounded-2xl hover:scale-105 transition shadow-xl"
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/interview")}
            className="w-full py-4 px-8 bg-gray-200 text-gray-800 text-lg font-medium rounded-2xl hover:bg-gray-300 transition"
          >
            Back to Config
          </button>
        </div>

        {/* Footer */}
         
      </div>
    </div>
  );
}
