import express from "express";
import cors from "cors";
import { PythonShell } from "python-shell";

const app = express();
app.use(cors());
app.use(express.json());

// Translate route
app.post("/api/translate", async (req, res) => {
  const { text, target } = req.body;

  if (!text || !target) {
    return res.status(400).json({ success: false, message: "Text & target language required" });
  }

  const options = {
    args: [text, target],
    mode: "text", // default, googletrans prints JSON as text
  };

  PythonShell.run("translate.py", options)
    .then((result) => {
      try {
        // Parse JSON string returned by Python
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

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
