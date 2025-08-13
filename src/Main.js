import React, { useState } from "react";

export default function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = "AIzaSyDB_xgZ5zXjLpDJH3X1PEk0l2HtJKQ4oEk"; // 🔑 Replace with your API key

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert("⚠️ Please paste your code first!");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const prompt = `
You are an expert code reviewer and debugger.
1. Detect the programming language.
2. Explain what the code is intended to do.
3. Predict the expected output (if any).
4. Find syntax or logic errors.
5. Explain the errors in very simple, beginner-friendly terms.
6. Suggest fixes.

Code:
\`\`\`
${code}
\`\`\`
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        setResult("❌ Error analyzing code. Please check your API key or try again.");
      }
    } catch (error) {
      console.error(error);
      setResult("❌ An error occurred while analyzing the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-2 text-purple-400">🧠 Code Review & Bug Explainer</h1>
      <p className="text-gray-400 mb-6 text-center">
        Paste your code below and let AI detect its language, explain it, find bugs, and suggest fixes.
      </p>

      <textarea
        className="w-full max-w-4xl p-4 text-black rounded-lg shadow-md focus:ring-2 focus:ring-purple-500"
        rows="10"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={analyzeCode}
        className="mt-4 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Code"}
      </button>

      {result && (
        <div className="mt-8 w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">💡 Analysis Result</h2>
          <pre className="whitespace-pre-wrap leading-relaxed text-gray-300">{result}</pre>
        </div>
      )}
    </div>
  );
}
