// translatoroutes.js

import express from "express";
import { PythonShell } from "python-shell";
import path from "path"; 

const router = express.Router();

// CRITICAL FIX: Define the absolute path to the Python 3.11 executable in the VENV.
// The VENV is in the 'src' folder, two levels up from this Routes file.
const VENV_ROOT = path.join(__dirname, '..', '..', 'venv_translator'); 
const PYTHON_EXE_PATH = path.join(VENV_ROOT, 'Scripts', 'python.exe');

router.post("/", async (req, res) => {
    console.log("Received:", req.body.text, req.body.target);
    
    const { text, target } = req.body;

    if (!text || !target) {
        return res.status(400).json({ message: "Missing text or target language" });
    }

    try {
        let options = {
            mode: "json", 
            pythonPath: PYTHON_EXE_PATH, 
            scriptPath: path.join(__dirname, '..'), // Points to the Backend folder
            args: [text, target],
        };

        const results = await PythonShell.run("translate.py", options);

        
        if (results && results.length > 0) {
            const translationResult = results[0]; 
            
            // --- CRITICAL SAFETY CHECK ADDED HERE ---
            if (typeof translationResult === 'object' && translationResult !== null) {
                
                if (translationResult.success) {
                    // Send the successfully parsed and extracted data back
                    return res.json({ 
                        success: true, 
                        // Key is 'translated' to match frontend Translator.jsx
                        translated: translationResult.translated_text 
                    });
                } else {
                    // If the Python script returned a JSON error object
                    console.error("Python Translation Error:", translationResult.error_message);
                    return res.status(500).json({ 
                        success: false, 
                        message: `Translation failed: ${translationResult.error_message}` 
                    });
                }
            }
        }
        
        // Fallback if results are empty or not the expected JSON object
        return res.status(500).json({ message: "Invalid or unparseable response from translator script." });

    } catch (error) {
        // This catch block handles errors thrown by PythonShell.run()
        console.error("Error executing PythonShell:", error.message);
        // Log the full Python output if available
        console.error("Full PythonShell Output:", error.stderr, error.stdout); 
        const errorMessage = error.stderr || error.message; 
        res.status(500).json({ success: false, message: `Translation failed. Shell Error: ${errorMessage}` });
    }
});

export default router;