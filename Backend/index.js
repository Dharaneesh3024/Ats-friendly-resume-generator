import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MODEL_URL = "https://api-inference.huggingface.co/models/google/t5-v1_1-small"; // smaller, faster model

// ===============================
// Retry helper function
// ===============================
async function fetchWithRetry(url, options, retries = 3, delay = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HF not ready: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn(`HF request failed (attempt ${i + 1}):`, err.message);
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

// ===============================
// Universal chatbot route
// ===============================
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.json({ answer: "Please enter a valid question." });
  }

  try {
    const hfResponse = await fetchWithRetry(
      MODEL_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Answer professionally and ATS-friendly:\n${message}`,
          parameters: { max_new_tokens: 150, temperature: 0.7 },
        }),
      },
      3, // retries
      1500 // wait 1.5s between retries
    );

    let answerText = "Sorry, could not generate a response at the moment.";

    if (hfResponse) {
      if (Array.isArray(hfResponse) && hfResponse[0]?.generated_text) {
        answerText = hfResponse[0].generated_text;
      } else if (hfResponse.generated_text) {
        answerText = hfResponse.generated_text;
      }
    }

    return res.json({ answer: answerText });
  } catch (err) {
    console.error("Backend AI error:", err);
    return res.json({
      answer: "AI service temporarily unavailable. Please try again later.",
    });
  }
});

// ===============================
// Server start
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
