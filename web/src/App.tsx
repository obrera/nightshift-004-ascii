import { useState, useEffect, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

const FONTS = [
  "Standard", "Ghost", "Banner", "Big", "Block",
  "Bubble", "Digital", "Ivrit", "Lean", "Mini",
  "Script", "Shadow", "Slant", "Small", "Speed", "Star Wars",
];

export default function App() {
  const [text, setText] = useState("Hello");
  const [font, setFont] = useState("Standard");
  const [art, setArt] = useState("");
  const [copied, setCopied] = useState(false);

  const render = useCallback(async () => {
    if (!text.trim()) { setArt(""); return; }
    try {
      const res = await fetch(`${API_URL}/api/render?text=${encodeURIComponent(text)}&font=${encodeURIComponent(font)}`);
      const data = await res.json();
      setArt(data.art || "");
    } catch {
      setArt("Error connecting to API");
    }
  }, [text, font]);

  useEffect(() => {
    const t = setTimeout(render, 200);
    return () => clearTimeout(t);
  }, [render]);

  const copy = async () => {
    await navigator.clipboard.writeText(art);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-2 text-purple-400">
        ASCII Art Generator
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Type text, pick a font, get ASCII art
      </p>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-purple-500 transition"
        />
        <select
          value={font}
          onChange={(e) => setFont(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-purple-500 transition cursor-pointer"
        >
          {FONTS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 min-h-[200px]">
        <button
          onClick={copy}
          disabled={!art}
          className="absolute top-3 right-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm px-3 py-1.5 rounded-md transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre className="text-green-400 text-xs sm:text-sm overflow-x-auto whitespace-pre font-mono leading-tight">
          {art || "Start typing to see ASCII art..."}
        </pre>
      </div>

      <footer className="text-center text-gray-600 text-sm mt-8">
        Built by <a href="https://github.com/obrera" className="text-purple-400 hover:underline">Obrera</a> · Nightshift #004
      </footer>
    </div>
  );
}
