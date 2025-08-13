import React, { useState } from "react";

export default function App() {
  const [code, setCode] = useState("");
  const [originalOutput, setOriginalOutput] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = "AIzaSyDB_xgZ5zXjLpDJH3X1PEk0l2HtJKQ4oEk";

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert("Please paste your code first!");
      return;
    }

    setLoading(true);
    setOriginalOutput("");
    setAnalysis("");

    try {
      const prompt = `
Detect the programming language, predict what the output will be, then review and debug the following code.
Format output as:

[ORIGINAL]
Language: <language>
Predicted Output:
<output>
Code:
<original code>

[ANALYSIS]
Step-by-step beginner-friendly explanation of any errors, and suggest a fix.
Fixed Code:
<fixed code>

Code to review:
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
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      );

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (text.includes("[ORIGINAL]") && text.includes("[ANALYSIS]")) {
        const originalPart = text.split("[ANALYSIS]")[0].replace("[ORIGINAL]", "").trim();
        const analysisPart = text.split("[ANALYSIS]")[1].trim();
        setOriginalOutput(originalPart);
        setAnalysis(analysisPart);
      } else {
        setAnalysis("❌ Could not parse Gemini output. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setAnalysis("❌ An error occurred while analyzing the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 Code Review & Bug Explainer</h1>

      <textarea
        className="w-full max-w-3xl p-4 text-black rounded-lg shadow-md font-mono"
        rows="8"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={analyzeCode}
        className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Code"}
      </button>

      {originalOutput && (
        <div className="mt-6 w-full max-w-3xl bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">📜 Original Code & Predicted Output</h2>
          <pre className="whitespace-pre-wrap text-green-300">{originalOutput}</pre>
        </div>
      )}

      {analysis && (
        <div className="mt-4 w-full max-w-3xl bg-yellow-100 text-gray-900 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">💡 Analysis & Fix</h2>
          <pre className="whitespace-pre-wrap">{analysis}</pre>
        </div>
      )}
    </div>
  );
}
