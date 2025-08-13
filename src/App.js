import React, { useState } from "react";
import CodeInput from "./components/CodeInput";
import ExplanationBox from "./components/ExplanationBox";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠ Replace with your own key (not safe for production frontend)
const genAI = new GoogleGenerativeAI("AIzaSyDB_xgZ5zXjLpDJH3X1PEk0l2HtJKQ4oEk");

function App() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setExplanation("⚠ Please paste your code before analyzing.");
      return;
    }

    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
You are a friendly code reviewer for beginners. 
Analyze the following code, detect any bugs, and explain them in very simple terms so a non-coder understands:
\`\`\`
${code}
\`\`\`
Output in this format:
1. Bug Description (short technical reason)
2. Simple Explanation in layman's terms
3. Suggestion to fix
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setExplanation(response.text());
    } catch (error) {
      setExplanation("❌ Error analyzing code. Check console for details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
          🧠 Code Review & Bug Explainer
        </h1>
        <CodeInput code={code} setCode={setCode} />
        <div className="flex justify-center my-4">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300 shadow-md"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Code"}
          </button>
        </div>
        {explanation && <ExplanationBox explanation={explanation} />}
      </div>
    </div>
  );
}

export default App;
