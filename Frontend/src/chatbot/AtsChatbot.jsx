import { useEffect, useRef, useState } from "react";
import { useResume } from "../context/ResumeContext";
import "./AtsSearchAI.css";

export default function AtsChatbot({ isOpen, onClose }) {
  const { resume } = useResume();
  const modalRef = useRef(null);
  const bottomRef = useRef(null);

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("ats_ai_messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  const skills = [
    ...(resume.skills?.languages || []),
    ...(resume.skills?.frameworks || []),
    ...(resume.skills?.tools || []),
  ];

  /* SAVE CHAT HISTORY */
  useEffect(() => {
    localStorage.setItem("ats_ai_messages", JSON.stringify(messages));
  }, [messages]);

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  /* SCROLL TO BOTTOM ON NEW MESSAGE */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!query.trim()) return;
    const userMessage = { type: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("https://resume-generator-server-sepia.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const aiMessage = { type: "ai", text: data.answer || "No response." };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const aiMessage = {
        type: "ai",
        text: "AI server not responding. Try again later.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("ats_ai_messages");
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

        {/* CHAT MESSAGES */}
        <div className="ai-results">
          {messages.length === 0 && <p className="hint">Ask like ChatGPT…</p>}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`ai-result-item ${msg.type === "user" ? "user-msg" : "ai-msg"}`}
            >
              <span>{msg.text}</span>
            </div>
          ))}
          {loading && <div className="ai-result-item ai-msg">Thinking...</div>}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="ai-input-bar">
          <input
            placeholder="Ask something…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
