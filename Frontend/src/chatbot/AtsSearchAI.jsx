import { useEffect, useRef, useState } from "react";
import { useResume } from "../context/ResumeContext";
import ReactMarkdown from "react-markdown"; // Recommended for neat formatting
import "./AtsSearchAI.css";

export default function AtsSearchAI({ isOpen, onClose }) {
  const { resume } = useResume();
  const modalRef = useRef(null);
  const bottomRef = useRef(null);

  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem("ats_ai_history");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  const skills = [
    ...(resume.skills?.languages || []),
    ...(resume.skills?.frameworks || []),
    ...(resume.skills?.tools || [])
  ];

  useEffect(() => {
    localStorage.setItem("ats_ai_history", JSON.stringify(chatHistory));
    // Auto-scroll to bottom on new message
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const generate = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", text: query };
    setChatHistory((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("https://resume-generator-server-sepia.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, skills })
      });

      const data = await res.json();
      // Assume backend returns an array of bullets or a single string
      const aiText = Array.isArray(data.bullets) ? data.bullets.join("\n\n") : data.answer;
      
      setChatHistory((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (err) {
      setChatHistory((prev) => [...prev, { role: "ai", text: "⚠️ Failed to reach AI server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`ai-overlay ${isOpen ? "open" : "hidden"}`}>
      <div className="ai-search-modal" ref={modalRef}>
        <div className="ai-header">
          <div className="header-info">
            <span className="ai-badge">AI</span>
            <h3>Resume Assistant</h3>
          </div>
          <div className="header-actions">
            <button className="text-btn" onClick={() => {setChatHistory([]); localStorage.removeItem("ats_ai_history");}}>Clear</button>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="ai-results">
          {chatHistory.length === 0 && <p className="hint">Try: "Write 3 bullet points for a React role using my skills"</p>}
          
          {chatHistory.map((msg, i) => (
            <div key={i} className={`message-wrapper ${msg.role}`}>
              <div className="message-bubble">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                {msg.role === "ai" && (
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(msg.text)}>
                    Copy content
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="message-wrapper ai">
              <div className="message-bubble loading-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="ai-input-bar">
          <input
            placeholder="Ask AI to optimize your resume..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
          />
          <button className="send-btn" onClick={generate} disabled={loading || !query.trim()}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}