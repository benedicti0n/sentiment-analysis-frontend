"use client"

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeSentiment() {
    setLoading(true);
    setError("");
    setSentiment("");

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze_sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sentiment");
      }

      const data = await response.json();
      setSentiment(data.sentiment);
    } catch (err) {
      setError("Error analyzing sentiment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <h2 className="text-xl font-bold">Sentiment Analysis</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a sentence..."
        className="border border-gray-300 p-2 rounded w-80"
      />
      <button
        onClick={analyzeSentiment}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={loading || !text.trim()}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {sentiment && (
        <p className="mt-2 text-lg font-semibold">
          Sentiment: <span className="text-blue-700">{sentiment}</span>
        </p>
      )}
    </div>
  );
}
