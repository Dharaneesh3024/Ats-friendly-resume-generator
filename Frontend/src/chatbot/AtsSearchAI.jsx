import { useEffect, useRef, useState } from "react";
import { useResume } from "../context/ResumeContext";
import "./atsSearchAI.css";

export default function AtsSearchAI({ isOpen, onClose }) {
  const { resume } = useResume();
  const modalRef = useRef(null);

  const [query, setQuery] = useState("");
  const [bullets, setBullets] = useState(() => {
    const saved = localStorage.getItem("ats_ai_bullets");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  const skills = [
    ...(resume.skills?.languages || []),
    ...(resume.skills?.frameworks || []),
    ...(resume.skills?.tools || [])
  ];

  /* ✅ Persist bullets */
  useEffect(() => {
    localStorage.setItem("ats_ai_bullets", JSON.stringify(bullets));
  }, [bullets]);

  /* ✅ Close on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const generate = async () => {
    if (!query.trim()) return alert("Type something");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/suggest-bullets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleQuery: query,
          skills
        })
      });

      const data = await res.json();
      setBullets((prev) => [...prev, ...(data.bullets || [])]);
      setQuery(""); // ChatGPT-like behavior
    } catch (err) {
      console.error(err);
      alert("Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setBullets([]);
    localStorage.removeItem("ats_ai_bullets");
  };

  return (
    <div className={`ai-overlay ${isOpen ? "open" : "hidden"}`}>
      <div className="ai-search-modal" ref={modalRef}>
        {/* HEADER */}
        <div className="ai-header">
          <h3>AI Resume Assistant</h3>
          <div>
            <button onClick={clearChat}>Clear</button>
            <button onClick={onClose}>✕</button>
          </div>
        </div>

        {/* RESULTS */}
        <div className="ai-results">
          {bullets.length === 0 && (
            <p className="hint">Ask for resume bullets like ChatGPT…</p>
          )}

          {bullets.map((b, i) => (
            <div key={i} className="ai-result-item">
              <span>{b}</span>
              <button onClick={() => navigator.clipboard.writeText(b)}>
                Copy
              </button>
            </div>
          ))}
        </div>

        {/* INPUT BAR */}
        <div className="ai-input-bar">
          <input
            className="ai-search-input"
            placeholder="Ask like: Frontend developer resume points"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
          />
          <button className="generate-btn" onClick={generate}>
            {loading ? "Generating..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
