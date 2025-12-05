// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          AI Interview Master
        </h1>
        <p className="text-xl text-gray-200 mb-10">
          Real interview feel • Instant AI feedback • Score + Graph + Resources
        </p>
        <a href="/interview" className="bg-white text-purple-900 px-12 py-6 rounded-full text-2xl font-bold hover:scale-110 transition shadow-2xl">
          Start Mock Interview 🚀
        </a>
      </div>
    </main>
  )
}