// backend/server.js
import express from "express";
import cors from "cors";
import questions from "./questionData.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS so your external website or frontend can access the API
app.use(cors({
  origin: "*", // for now allow all, later replace with your site like "https://example.com"
  methods: ["GET", "POST"],
}));

// Middleware
app.use(express.json());

// ✅ Example route: get all questions
app.get("/api/questions", (req, res) => {
  res.json(questions);
});

// ✅ Example route: submit score
app.post("/api/submit", (req, res) => {
  const { playerName, score } = req.body;
  console.log(`Player ${playerName} scored ${score}`);
  res.json({ message: "Score received!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
