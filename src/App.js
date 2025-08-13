import React, { useState } from "react";
import CodeInput from "./components/CodeInput";
import ExplanationBox from "./components/ExplanationBox";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠ Replace with your API key (not safe in frontend for production)
const genAI = new GoogleGenerativeAI("AIzaSyAFVmsFxKsTfBA1wHeFIR9Iao_w2TH16yQ");

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
      setExplanation("");

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
You are a friendly code reviewer for beginners.
Analyze the following code, find any bugs, and explain them so a non-coder can understand:
\`\`\`
${code}
\`\`\`
Format your response like:
1. Bug Description (technical)
2. Simple Explanation
3. Suggestion to Fix
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setExplanation(response.text());
    } catch (error) {
      console.error(error);
      setExplanation("❌ Error analyzing code. Please check your API key and internet connection.");
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
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300 shadow-md disabled:opacity-50"
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
