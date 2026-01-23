import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk"; // Import Groq

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Groq with your API Key

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ===============================
// Chatbot route (Llama 3.3 70B)
// ===============================
app.get("/", (req, res) => {
  res.json({ status: "Server is live", message: "Send a POST request to /api/chat to talk to the AI." });
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.json({ answer: "Please enter a valid question." });
  }

  try {
    // Groq's SDK handles the connection and retries for you
    const chatCompletion = await groq.chat.completions.create({
  messages: [
    {
      role: "system",
      content: `You are an ATS Resume Expert. 
      Following points are meant to be followed by you:
      - Provide ats friendly points according to what user asks.
      - Keep the conversation short.
      - Only give the necessary points and not entire resume content.
      - If new point comes in,add a line break.
      `
    },
    { role: "user", content: message }
  ],
  model: "llama-3.3-70b-versatile",
});

    const answerText = chatCompletion.choices[0]?.message?.content || 
                       "Sorry, I couldn't generate a response.";

    return res.json({ answer: answerText });

  } catch (err) {
    console.error("Groq AI Error:", err);
    
    // Handle specific API errors (like rate limits)
    if (err.status === 429) {
        return res.json({ answer: "Slow down! Too many requests. Try again in a minute." });
    }

    return res.json({
      answer: "The AI service is currently unavailable. Please try again later.",
    });
  }
});
// Export the app for Vercel's serverless environment
export default app;

// Keep this only for local development testing
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Llama 3.3 Backend running at http://localhost:${PORT}`);
  });
}