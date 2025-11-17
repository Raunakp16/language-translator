import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Home.css";
import Translator from "./Translator";

function Home() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("hi");
  const [output, setOutput] = useState("");

  const handleTranslate = () => {
    setOutput(`Translation will appear here...\n\nYour text: ${text}`);
  };

  return (
    <>
      <Navbar />
<Translator/>
     

      
    </>
  );
}

export default Home;
