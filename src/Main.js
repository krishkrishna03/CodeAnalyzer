import React, { useState } from "react";
import "prismjs/themes/prism-tomorrow.css"; // Syntax highlighting theme
import Prism from "prismjs";

export default function App() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const GEMINI_API_KEY = "AIzaSyDB_xgZ5zXjLpDJH3X1PEk0l2HtJKQ4oEk"; // Replace before deploying

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert("Please paste your code first!");
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Detect the programming language of the following code, predict the intended output, find bugs, and explain them in very simple terms for a non-coder. Also, provide a corrected version with syntax highlighting. Format the output as JSON with keys: language, intendedOutput, errors, explanation, fix.\n\n${code}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();
      let textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Try parsing JSON if Gemini returned structured data
      try {
        const parsed = JSON.parse(textResponse);
        setAnalysis(parsed);
      } catch {
        setAnalysis({ explanation: textResponse });
      }
    } catch (error) {
      console.error(error);
      setAnalysis({ explanation: "❌ Error analyzing code. Try again." });
    } finally {
      setLoading(false);
      setTimeout(() => Prism.highlightAll(), 0); // Highlight code
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">🧠 Code Review & Bug Explainer</h1>

      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-xl shadow-lg">
        <textarea
          className="w-full p-4 text-black rounded-lg shadow-md font-mono text-sm"
          rows="10"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={analyzeCode}
          className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Code"}
        </button>
      </div>

      {analysis && (
        <div className="w-full max-w-4xl mt-6 space-y-4">
          {analysis.language && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-blue-300">📌 Detected Language</h2>
              <p className="mt-2 text-lg">{analysis.language}</p>
            </div>
          )}

          {analysis.intendedOutput && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-green-300">📤 Predicted Output</h2>
              <pre className="whitespace-pre-wrap">{analysis.intendedOutput}</pre>
            </div>
          )}

          {analysis.errors && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-red-300">❌ Errors Found</h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {analysis.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.explanation && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-yellow-300">💡 Explanation</h2>
              <p className="mt-2 whitespace-pre-wrap">{analysis.explanation}</p>
            </div>
          )}

          {analysis.fix && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-purple-300">✅ Suggested Fix</h2>
              <pre className="language-php rounded-md p-2 bg-gray-900">
                <code className="language-php">{analysis.fix}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
