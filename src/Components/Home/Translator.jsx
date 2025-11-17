import React, { useState } from "react";
import axios from "axios";
import "./Translator.css";

function Translator() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("hi");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTranslate = async () => {
    if (!text.trim()) {
      alert("Please enter some text!");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setTranslatedText("");

    try {
      const res = await axios.post("http://localhost:5000/api/translate", {
        text,
        target: language,
      });

      if (res.data.success) {
        setTranslatedText(res.data.translated);
      } else {
        setErrorMessage(res.data.message || "Translation failed.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Translation failed on the server.");
    }

    setLoading(false);
  };

  return (
    <div className="translator-container">
      <label className="label">Enter Text:</label>
      <textarea
        className="input-box"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label className="label">Select Language:</label>
      <select
        className="language-dropdown"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="hi">Hindi</option>
        <option value="mr">Marathi</option>
        <option value="en">English</option>
      </select>

      <button
        className="translate-btn"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      <div className="output-box">
        {errorMessage ? (
          <span style={{ color: "red" }}>{errorMessage}</span>
        ) : loading ? (
          "Translating..."
        ) : translatedText ? (
          translatedText
        ) : (
          "Translated text will appear here..."
        )}
      </div>
    </div>
  );
}

export default Translator;
