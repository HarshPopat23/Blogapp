import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 5000;

/* ---------- Middleware ---------- */
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

/* ---------- ENV CHECK ---------- */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env");
  process.exit(1);
}

/* ---------- Gemini Init ---------- */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-1.5-flash"; // safer free-tier model

/* ---------- CHAT ROUTE ---------- */
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(message);

    const reply = result?.response?.text();
    if (!reply) {
      return res.status(500).json({ error: "Empty AI response" });
    }

    res.json({ reply });
  } catch (err) {
    console.error("Gemini Chat Error:", err.message);

    if (err.status === 429) {
      return res.status(429).json({
        error: "AI quota exceeded. Please wait or upgrade your plan.",
      });
    }

    res.status(500).json({ error: "AI chat failed" });
  }
});

/* ---------- POST ENHANCER ---------- */
app.post("/api/enhance-post", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const prompt = `
You are an expert educator.

TOPIC:
${title}

EXISTING CONTENT:
${content || "No content provided."}

TASK:
- Improve explanation
- Add examples
- Use Markdown formatting
`;

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);

    const enhancedContent = result?.response?.text();
    if (!enhancedContent) {
      return res.status(500).json({ error: "Empty AI response" });
    }

    res.json({ enhancedContent });
  } catch (err) {
    console.error("Gemini Enhance Error:", err.message);

    if (err.status === 429) {
      return res.status(429).json({
        error: "AI quota exceeded. Please wait or upgrade your plan.",
      });
    }

    res.status(500).json({ error: "Post enhancement failed" });
  }
});

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("✅ Gemini backend is running");
});

/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
