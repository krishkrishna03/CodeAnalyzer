import React, { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";

export default function App() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("language");

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
      setTimeout(() => Prism.highlightAll(), 0);
    }
  };

  const renderTabContent = () => {
    if (!analysis) return null;

    switch (activeTab) {
      case "language":
        return <p className="text-lg">{analysis.language || "N/A"}</p>;
      case "output":
        return <pre className="whitespace-pre-wrap">{analysis.intendedOutput || "N/A"}</pre>;
      case "errors":
        return (
          <ul className="list-disc list-inside space-y-1">
            {analysis.errors?.map((err, i) => <li key={i}>{err}</li>) || <li>No errors found</li>}
          </ul>
        );
      case "explanation":
        return <p className="whitespace-pre-wrap">{analysis.explanation || "N/A"}</p>;
      case "fix":
        return (
          <pre className="language-php rounded-md p-2 bg-gray-900 overflow-x-auto">
            <code className="language-php">{analysis.fix || "N/A"}</code>
          </pre>
        );
      default:
        return null;
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
        <div className="w-full max-w-4xl mt-6 bg-gray-800 rounded-lg shadow-md">
          <div className="flex border-b border-gray-700">
            {["language", "output", "errors", "explanation", "fix"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 text-sm font-semibold capitalize ${
                  activeTab === tab ? "bg-gray-900 text-blue-400" : "hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4">{renderTabContent()}</div>
        </div>
      )}
    </div>
  );
}
