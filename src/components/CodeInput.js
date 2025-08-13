import React from "react";

const CodeInput = ({ code, setCode }) => {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-2">
        Paste your code here:
      </label>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        className="w-full p-4 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-mono"
        placeholder="e.g., function greet() { console.log('Hello') }"
      />
    </div>
  );
};

export default CodeInput;
