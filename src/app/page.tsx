export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-purple-900 to-blue-900 flex items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          AI Interview Master
        </h1>
        <p className="text-xl text-gray-200 mb-10">
          Real interview feel • Instant AI feedback • Score + Graph + Resources
        </p>
        <a href="/interview" className="bg-white text-purple-900
         px-8 py-4 rounded-full text-sm font-bold
         hover:scale-110 transition shadow-2xl
         md:px-12 md:py-6 md:text-2xl md:hover:shadow-purple-400/30">
          Start Mock Interview 🚀
        </a>
      </div>
    </main>
  )
}