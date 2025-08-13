import React, { useState } from "react";

export default function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = "AIzaSyAFVmsFxKsTfBA1wHeFIR9Iao_w2TH16yQ"; // Replace with your Gemini API key

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert("Please paste your code first!");
      return;
    }

    setLoading(true);
    setResult("");

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
                    text: `Review and debug the following code in a simple way for a non-coder. Give clear step-by-step explanation:\n\n${code}`
                  }
                ]
              }
            ]
          })
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 Code Review & Bug Explainer</h1>

      <textarea
        className="w-full max-w-3xl p-4 text-black rounded-lg shadow-md"
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

      {result && (
        <div className="mt-6 w-full max-w-3xl bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">💡 Explanation</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
