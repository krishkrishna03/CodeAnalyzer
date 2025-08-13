import React, { useState } from "react";
import CodeInput from "./components/CodeInput";
import ExplanationBox from "./components/ExplanationBox";

function App() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleAnalyze = () => {
    // Mocked AI output (you can connect to backend API later)
    const mockResponse = `
1. ❌ Bug: You're missing a semicolon on line 4. (This tells the computer that the instruction ended.)
2. 🔄 Loop Error: The loop condition may never end — this can crash your program.
3. ✅ Suggestion: Use '===' instead of '==' for better accuracy.

🧠 In Simple Terms:
Your code is like a recipe. One of your steps doesn’t end properly, and one loop keeps going forever. Fix these to make your code run safely.
    `;
    setExplanation(mockResponse);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">🧠 Code Review & Bug Explainer</h1>
        <CodeInput code={code} setCode={setCode} />
        <div className="flex justify-center my-4">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300 shadow-md"
            onClick={handleAnalyze}
          >
            Analyze Code
          </button>
        </div>
        {explanation && <ExplanationBox explanation={explanation} />}
      </div>
    </div>
  );
}

export default App;
