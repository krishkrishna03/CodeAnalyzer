import React from "react";

const ExplanationBox = ({ explanation }) => {
  return (
    <div className="mt-6 p-5 bg-yellow-100 border-l-4 border-yellow-500 rounded-xl">
      <h2 className="text-xl font-bold mb-2 text-yellow-700">💡 Explanation</h2>
      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
        {explanation}
      </pre>
    </div>
  );
};

export default ExplanationBox;
