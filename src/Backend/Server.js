import express from "express";
import cors from "cors";
import { PythonShell } from "python-shell";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Auth Routes
app.use("/api/auth", authRoutes);

// Translation Route
app.post("/api/translate", async (req, res) => {
  const { text, target } = req.body;

  if (!text || !target) {
    return res.status(400).json({ success: false, message: "Text & target language required" });
  }

  const options = {
    args: [text, target],
    mode: "text",
    // Uncomment if using virtual env:
    // pythonPath: "C:\\Users\\Lenovo\\Language_translation_app\\src\\venv_translator\\Scripts\\python.exe"
  };

  PythonShell.run("translate.py", options)
    .then((result) => {
      try {
        const parsed = JSON.parse(result[0]);
        if (parsed.success) {
          return res.json({ success: true, translated: parsed.translated_text });
        } else {
          return res.status(500).json({ success: false, message: parsed.error_message });
        }
      } catch (err) {
        console.error("JSON Parse Error:", err);
        return res.status(500).json({ success: false, message: "Invalid response from Python script" });
      }
    })
    .catch((err) => {
      console.error("Python Error:", err);
      return res.status(500).json({ success: false, message: "Translation failed on server" });
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
