// lib/gemini.ts
export async function generateInterviewQuestions({
  role,
  experience,
  difficulty,
}: {
  role: string;
  experience: string;
  difficulty: string;
}) {
  const API_KEY = process.env.GEMINI_API_KEY;
  //console.log("Using Gemini API Key:", API_KEY);

  if (!API_KEY) {
    throw new Error("Gemini API key missing!");
  }

  const prompt = `
You are an expert technical interviewer.

Generate exactly 10 high-quality multiple-choice questions (MCQs) for a ${role} with ${experience} years of experience at ${difficulty} difficulty level.

Return ONLY valid JSON in this exact format (no extra text):

{
  "questions": [
    {
      "question": "Question text here",
      "options": ["A. Option one", "B. Option two", "C. Option three", "D. Option four"],
      "correct": 1,               // index of correct answer (0-3)
      "explanation": "Short explanation why this is correct"
    }
  ]
}
`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  const response = await fetch(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Gemini API failed");
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  // Clean JSON from ```json blocks
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
  const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;

  try {
    const parsed = JSON.parse(jsonString);
    return parsed.questions;
  } catch (error) {
    console.error("JSON Parse failed:", error, jsonString);
    throw new Error("Invalid response from AI");
  }
}