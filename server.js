import express from "express";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.get("/", (req,res) => res.sendFile(path.join(__dirname, "public","index.html")));
app.get("/docs", (req,res) => res.sendFile(path.join(__dirname, "public","docs.html")));
app.get("/marketplace", (req,res) => res.sendFile(path.join(__dirname, "public","marketplace.html")));
app.get("/contact", (req,res) => res.sendFile(path.join(__dirname, "public","contact.html")));
app.get("/ai", (req,res) => res.sendFile(path.join(__dirname, "public","ai.html")));

// AI API
app.post("/api/ai", async (req,res) => {
    const { message } = req.body;
    if(!message) return res.json({ reply: "Please send a message!" });

    const lowerMsg = message.toLowerCase();

    if(lowerMsg.includes("owner") || lowerMsg.includes("who")) {
        return res.json({ reply: "Owner: Anuga Senithu, Country: Sri Lanka" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions",{
            method:"POST",
            headers:{
                "Authorization":"Bearer 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",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                model:"gpt-4",
                messages:[{role:"user", content:message}]
            })
        });

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content || "I couldn't understand that!";
        res.json({ reply });
    } catch(e) {
        console.error(e);
        res.json({ reply: "Error connecting to OpenAI API." });
    }
});

app.listen(PORT,()=>console.log(`🚀 Server running on port ${PORT}`));
